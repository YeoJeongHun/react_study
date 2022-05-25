

const ARTICLE = 'article'       //게시글 페이지 이동
const NUMBER = 'number'       //숫자인식 페이지 이동
const HANGUL = 'hangul'       //한글인식 페이지 이동
const CREATE_IMG = 'create_img' //문자 이미지 생성 페이지

// 액션 함수
export function openArticle (payload) {
    return {
        type: ARTICLE,
        payload,
    };
}
export function openNumber (payload) {
    return {
        type: NUMBER,
        payload,
    };
}
export function openHangul (payload) {
    return {
        type: HANGUL,
        payload,
    };
}
export function openCreateImg (payload) {
    return {
        type: CREATE_IMG,
        payload,
    };
}

// 초기 상태
const initState = {
    page: 'article',
}

// 리듀서
export default function mainStatus (state = initState, action) {
    switch (action.type) {
        case ARTICLE:
            return {
                // ...state,
                page: 'article',
            };
        case NUMBER:
            return {
                // ...state,
                page: 'number',
            };
        case HANGUL:
            return {
                // ...state,
                page: 'hangul',
            };
        case CREATE_IMG:
            return {
                // ...state,
                page: 'create_img',
            };

        default:
            return state;
    }
}