
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';

import { writeArticle, goToDetailArticle } from '../../store/modules/article';
import './Article.css';

const columns = [
    {
        title: '번호',
        dataIndex: 'seq',
        key: 'seq',
        align: 'center',
        width: '10%',
    },
    {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
        width: '70%',
        render: text => <a>{text}</a>,
    },
    {
        title: '작성자',
        dataIndex: 'writer',
        key: 'writer',
        width: '20%',
    },
];

export default function ArticleListTable () {
    let articleList = useSelector((state) => state.article.articleList).filter(
        (article) => article.delState === false
    );
    articleList = articleList.reduce( (acc, data) => {
        acc.result.push({
            ...data,
            key: data.seq,
        })
        return acc;
    }, { result: [] }).result;

    const dispatch = useDispatch();

    const goToArticleDetailPage = (seq) => {
        return dispatch(goToDetailArticle(seq));
    }

    return (
        <div id='articleListTableArea'>
            <Table bordered pagination={{ pageSize: 10 }} columns={columns} dataSource={articleList} 
                onRow={ (data, index) => ({
                    onClick: () => {
                        goToArticleDetailPage({seq: data.seq});
                    }
                })}
            />
        </div>
    )
}