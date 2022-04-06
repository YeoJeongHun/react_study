

const LIST_PAGE = 'article/LIST_PAGE'       //게시글 리스트 페이지 이동
const WRITE = 'article/WRITE';              //게시글 쓰기
const WRITE_PAGE = 'article/WRITE_PAGE'     //게시글 쓰기 페이지 이동
const UPDATE = 'article/UPDATE';            //게시글 수정
const UPDATE_PAGE = 'article/UPDATE_PAGE'   //게시글 수정 페이지 이동
const DELETE = 'article/DELETE';            //게시글 삭제
const DETAIL_PAGE = 'article/DETAIL_PAGE'   //게시글 상세보기 페이지 이동

// 액션 함수
export function writeArticle (payload) {
    return {
        type: WRITE,
        payload,
    };
}
export function updateArticle (seq, title, content, writer) {
    return {
        type: UPDATE,
        seq,
        title,
        content,
        writer,
    };
}
export function deleteArticle (seq) {
    return {
        type: DELETE,
        seq,
    };
}
export function goToListArticle (payload) {
    return {
        type: LIST_PAGE,
        payload,
    };
}
export function goToWriteArticle (payload) {
    return {
        type: WRITE_PAGE,
        payload,
    };
}
export function goToUpdateArticle (payload) {
    return {
        type: UPDATE_PAGE,
        payload,
    };
}
export function goToDetailArticle (payload) {
    return {
        type: DETAIL_PAGE,
        payload,
    };
}

// 초기 상태
const initState = {
    articleList: [
        {
            seq: 0,
            title: '제목0',
            content: '내용0',
            writer: '작성자0',
            delState: false,
        },
        {
            seq: 1,
            title: '제목1',
            content: '내용1',
            writer: '작성자1',
            delState: false,
        },
        {
            seq: 2,
            title: '제목2',
            content: '내용2',
            writer: '작성자2',
            delState: true,
        },
    ],
    articlePage: 'list',            // list, write, detail, update
    articleDetailSeq: null,
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
                    writer: action.payload.writer,
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
                        writer: action.payload.writer,
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
        case LIST_PAGE:
            return {
                ...state,
                articlePage: 'list'
            }
        case WRITE_PAGE:
            return {
                ...state,
                articlePage: 'write'
            }
        case UPDATE_PAGE:
            return {
                ...state,
                articlePage: 'update'
            }
        case DETAIL_PAGE:
            return {
                ...state,
                articlePage: 'detail',
                articleDetailSeq: action.payload.seq,
            }

        default:
            return state;
    }
}