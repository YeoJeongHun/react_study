

const WRITE = 'article/WRITE';      //게시글 쓰기
const UPDATE = 'article/UPDATE';    //게시글 수정
const DELETE = 'article/DELETE';    //게시글 삭제

// 액션 함수
export function writeArticle (payload) {
    return {
        type: WRITE,
        payload,
    };
}

export function updateArticle (seq, title, content) {
    return {
        type: UPDATE,
        seq,
        title,
        content,
    };
}

export function deleteArticle (seq) {
    return {
        type: DELETE,
        seq,
    };
}

// 초기 상태
const initState = {
    articleList: [
        {
            seq: 0,
            title: '제목0',
            content: '내용0',
            delState: false,
        },
        {
            seq: 1,
            title: '제목1',
            content: '내용1',
            delState: false,
        },
        {
            seq: 2,
            title: '제목2',
            content: '내용2',
            delState: true,
        },
    ],
}

// 리듀서
export default function article (state = initState, action) {
    switch (action.type) {
        case WRITE:
            return {
                ...state,
                articleList: state.articleList.concat({
                    seq: action.payload.seq,
                    title: action.payload.title,
                    content: action.payload.content,
                    delState: false,
                })
            };
        case UPDATE:
            return {
                ...state,
                articleList: state.articleList.map(article => {
                    return article.seq === action.seq ?
                    {
                        seq: action.payload.seq,
                        title: action.payload.title,
                        content: action.payload.content,
                        delState: false,
                    } :
                    article;
                })
            }
        case DELETE:
            return {
                ...state,
                articleList: state.articleList.map(article => {
                    return article.seq === action.seq ? {...article, delState: true} : article;
                })
            }
        default:
            return state;
    }
}