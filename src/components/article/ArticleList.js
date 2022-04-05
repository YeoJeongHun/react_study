
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { writeArticle, updateArticle, deleteArticle } from '../../store/modules/article';
import ArticleListTable from './ArticleListTable';

export default function ArticleList () {
    const articleList = useSelector((state) => state.article.articleList).filter(
        (article) => article.delState === false
    );
    const inputRef = useRef();
    const dispatch = useDispatch();

    const writeNewArticle = () => {
        return dispatch(writeArticle({
            seq: '3',
            title: 'test',
            content: 'test',
            writer: '작성자test',
            delState: false
        }));
    }

    return (
        <section>
            <h1>게시글</h1>
            <div>
                <button type='primary' onClick={writeNewArticle}>테스트 글쓰기</button>
            </div>
            <ul>
                {articleList.map(article =>
                    <li key={article.seq}>
                        <span>{article.title}</span>
                        <span>{article.content}</span>
                        <span>{article.writer}</span>
                    </li>
                )}
            </ul>
            <ArticleListTable/>
        </section>
    )
}