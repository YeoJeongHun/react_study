
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { goToWriteArticle, goToListArticle, goToUpdateArticle } from '../../store/modules/article';
import ArticleListTable from './ArticleListTable';
import ArticleWrite from './ArticleWrite';

function showPage (articlePage) {
    switch(articlePage) {
        case 'list':
            return <ArticleListTable/>;
        case 'write':
            return <ArticleWrite/>;
    }
}

export default function ArticleList () {
    const articlePage = useSelector((state) => state.article.articlePage);
    const inputRef = useRef();
    const dispatch = useDispatch();

    const goToArticleWritePage = () => {
        return dispatch(goToWriteArticle());
    }

    const goToArticleListPage = () => {
        return dispatch(goToListArticle());
    }

    return (
        <section>
            <h1>게시글</h1>
            <div>
                <Button onClick={() => goToArticleWritePage()}>글쓰기 페이지</Button>
                <Button onClick={() => goToArticleListPage()}>게시글 목록 보기</Button>
            </div>
            {articlePage === 'list'}
            {showPage(articlePage)}
        </section>
    )
}