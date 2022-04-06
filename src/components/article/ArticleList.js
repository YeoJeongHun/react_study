
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { goToWriteArticle, goToListArticle, goToUpdateArticle } from '../../store/modules/article';
import ArticleListTable from './ArticleListTable';
import ArticleWrite from './ArticleWrite';
import ArticleDetail from './ArticleDetail';
import ArticleUpdate from './ArticleUpdate';
import fetch from 'dva/fetch';

const axios = require('axios');

function showPage (articlePage) {
    switch(articlePage) {
        case 'list':
            return <ArticleListTable/>;
        case 'write':
            return <ArticleWrite/>;
        case 'detail':
            return <ArticleDetail/>;
        case 'update':
            return <ArticleUpdate/>;
    }
}

export default function ArticleList () {
    const articlePage = useSelector((state) => state.article.articlePage);
    const dispatch = useDispatch();

    const goToArticleWritePage = () => {
        return dispatch(goToWriteArticle());
    }

    const goToArticleListPage = () => {
        return dispatch(goToListArticle());
    }

    const fetchTest = () => {
        fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => {
            console.log('res : ', res);
        })
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        console.log('결과 : ');
    }

    return (
        <section>
            <h1>게시글</h1>
            <div>
                <Button onClick={() => goToArticleWritePage()}>글쓰기 페이지</Button>
                <Button onClick={() => goToArticleListPage()}>게시글 목록 보기</Button>
                <Button onClick={() => fetchTest()}>fetch테스트 버튼</Button>
            </div>
            {articlePage === 'list'}
            {showPage(articlePage)}
        </section>
    )
}