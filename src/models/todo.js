
import { queryNoticeInfos, } from '../services/api';
import moment from 'moment';

const initialState = {
  inputSearchBar: '',
  noticeList: [],
  noticeInfo : {},
  isLoadingList: false,
  selectedRowKeys: [],
  noticePopupList : [],
  closedNoticeList : [],
  openedNoticeList : [],
};

export default {
  state: initialState,
  effects: {
    *fetchNoticeInfos(_, { call, put, select }) {
      const {inputSearchBar} = yield select(({ notice }) => notice);
      const token = 'test';
      const response = yield call(queryNoticeInfos, inputSearchBar,token);
      yield put({
        type: 'changeLoadingList',
         payload: true ,
      });
      let { data } = response;
      if (data !== undefined && data.length > 1) {
        data = data.sort((d1, d2) => d2.notice_seq - d1.notice_seq);
      }
      yield put({
        type: 'saveList',
        payload: { list: data, total: response.length },
      });

      yield put({
        type: 'submitSearch',
      });
    },

  },
  reducers: {
    changeLoadingList(state, { payload }) {
      return {
        ...state,
        isLoadingList: payload,
      };
    },
    
    saveList(state, { payload }) {
        return {
          ...state,
          noticeList: [
            ...payload.list.map(info => ({
              ...info,
              key: info.notice_seq,
            })),
          ],
          isLoadingList: false,
        };
    },
    
    submitSearch(state) {
        let filterList  = state.noticeList.filter(
          (item) => item.subject.includes(state.inputSearchBar) || item.content.includes(state.inputSearchBar)
        );
  
        return {
          ...state,
          selectedRowKeys: [],
          noticeList : filterList
        };
    },

  },
};
