
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';

import { goToWriteArticle } from '../../store/modules/article';
import './ArticleListTable.css';

export default function ArticleWrite () {
    let articleList = useSelector((state) => state.article.articleList).filter(
        (article) => article.delState === false
    );
    console.log('articleList : ', articleList);
    articleList = articleList.reduce( (acc, data) => {
        acc.result.push({
            ...data,
            key: data.seq,
        })
        return acc;
    }, { result: [] }).result;
    console.log('articleList : ', articleList);

    const inputRef = useRef();
    const dispatch = useDispatch();

    const writeNewArticle = () => {
        return dispatch(goToWriteArticle());
    }

    return (
        <div>
            test
        </div>
    )
}