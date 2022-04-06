
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card, Row, Col, Input, Spin, Button, message, DatePicker, Divider} from 'antd';
import 'antd/dist/antd.css';
import styled from "styled-components";

import { updateArticle, goToDetailArticle } from '../../store/modules/article';
import './Article.css';

const { TextArea } = Input;
const FormItem = Form.Item;

const DivTitleWriterArea = styled.div`
        width: 100%;
        text-align: left;
        word-break: break-all;
    `;

export default function ArticleUpdate () {
    const articleDetailSeq = useSelector((state) => state.article.articleDetailSeq);
    const articleDetail = useSelector((state) => state.article.articleList).filter(
        (article) => article.seq === articleDetailSeq
    )[0];

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const doUpdateArticle = (values) => {
        console.log(values);
        dispatch(updateArticle({
            seq: articleDetailSeq,
            title: values.title,
            content: values.content,
            writer: '작성자' + articleDetailSeq,
            delState: false,
        }));
        dispatch(goToDetailArticle({seq: articleDetailSeq}));
    }

    const { getFieldDecorator } = Form;

    return (
        <div id='articleWriteArea'>
            <Card>
                <Form form={form}
                    onFinish={doUpdateArticle}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    name="dynamic_form_nest_item" autoComplete="off"
                    initialValues={{
                        title: articleDetail.title,
                        content: articleDetail.content
                    }}
                >
                    <Row>
                        <Col span={8}>
                            <FormItem label="제목" name="title" rules={[{ require: true }]}>
                                <Input maxLength={256} disabled={false} style={{ width: "350%" }} />
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
                            <FormItem label="내용" name="content" rules={[{ require: true }]}>
                                <TextArea rows={20} maxLength={1000} disabled={false} style={{ width: "350%", maxWidth: "350%" }} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit">저장</Button>
                </Form>
            </Card>
        </div>
    )
}