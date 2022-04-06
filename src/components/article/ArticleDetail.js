
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card, Row, Col, Input, Spin, Button, message, DatePicker, Divider} from 'antd';
import 'antd/dist/antd.css';
import styled from "styled-components";

import { goToUpdateArticle } from '../../store/modules/article';
import './Article.css';

const { TextArea } = Input;
const FormItem = Form.Item;

const DivContentArea = styled.div`
        width: 350%;
        text-align: left;
        max-height: 500px;
        overflow-y: auto;
        word-break: break-all;
        &::-webkit-scrollbar {
        /* 세로 스크롤 넓이 */
        width: 6px;
    
        /* 가로 스크롤 높이 */
        height: 6px;
    
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.4);
        }
        &::-webkit-scrollbar-thumb {
        background-color: rgba(100, 100, 100, 0.3);
        border-radius: 6px;
        }
    `;
const DivTitleWriterArea = styled.div`
        width: 100%;
        text-align: left;
        word-break: break-all;
    `;

export default function ArticleDetail () {
    const articleDetailSeq = useSelector((state) => state.article.articleDetailSeq);
    const articleDetail = useSelector((state) => state.article.articleList).filter(
        (article) => article.seq === articleDetailSeq
    )[0];

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const goToUpdateArticlePage = () => {
        dispatch(goToUpdateArticle({seq: articleDetailSeq}));
    }

    return (
        <div id='articleWriteArea'>
            <Card>
                <Form form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    name="dynamic_form_nest_item" autoComplete="off"
                >
                    <Row>
                        <Col span={8}>
                            <FormItem label="제목" name="title">
                                <DivTitleWriterArea>
                                    {articleDetail.title}
                                </DivTitleWriterArea>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label="작성자" name="writer">
                                <DivTitleWriterArea>
                                    {articleDetail.writer}
                                </DivTitleWriterArea>
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={8}>
                            <FormItem label="내용" name="content">
                                <DivContentArea>
                                    <div>
                                            {(articleDetail.content||'').split("\n").map((line) => {
                                                return (
                                                    <span style={{wordBreak: "break-all"}}>
                                                        {line}
                                                        <br />
                                                    </span>
                                                )
                                            })}
                                    </div>
                                </DivContentArea>
                            </FormItem> 
                        </Col>
                    </Row>
                </Form>
            </Card>
            <Button type="primary" onClick={goToUpdateArticlePage}>수정하기</Button>
        </div>
    )
}