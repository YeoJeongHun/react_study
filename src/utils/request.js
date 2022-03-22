import fetch from 'dva/fetch';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';

/**
 * @see <a href="https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C">HTTP 상태 코드</a>
 */
const codeMessage = {
  200: '성공 - 서버가 요청을 제대로 처리헸습니',
  201: '작성됨 - 성공적으로 요청되었으며 서버가 새 리소스를 작성했습니다',
  202: '허용됨 - 서버가 요청을 접수했지만 아직 처리하지 않았습니다',
  204: '삭제됨 - 데이터 삭제를 성공했습니다', // todo: 확인 필요!
  400: '잘못된 요청 - 서버가 요청의 구문을 인식하지 못했습니다',
  401: '권한 없음 - 이 요청은 인증이 필요합니다',
  403: '금지됨 - 사용자에게는 권한이 있지만, 접근은 금지되어 있습니다',
  404: '찾을 수 없음 - 서버가 요청한 페이지(Resource)를 찾을 수 없습니다.',
  406: '허용되지 않음 -  요청한 페이지가 요청한 콘텐츠 특성으로 응답할 수 없습니다.',
  410: '삭제됨 - 요청된 자원은 영구히 삭제되어 사용할 수 없습니다.',
  422: '유효하지않는 데이터 - 유효성 검사 오류가 발생했습니다',
  500: '내부 서버 오류 - 서버에 오류가 발생하여 요청을 수행할 수 없습니다.',
  502: '불량 게이트웨이 - 서버가 게이트웨이나 프록시 역할을 하고 있거나 또는 업스트림 서버에서 잘못된 응답을 받았습니다.',
  503: '서비스를 사용할 수 없음 - 서버가 오버로드되었거나 유지관리를 위해 다운되었기 때문에 현재 서버를 사용할 수 없습니다.',
  504: '게이트웨이가 시간 초과했습니다.',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  console.warn(`요청 오류 ${response.status}: ${response.url} description:${errortext}`);
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  return response;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        try {
          sessionStorage.setItem(hashcode, content);
          sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
        } catch (e) {
          console.error(`request cachedSave Error:${e}`);
        }
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
  const options = {
    expirys: isAntdPro(),
    ...option,
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      // environment should not be used
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        window.location.reload();
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/exception/404');
      }
    });
}
