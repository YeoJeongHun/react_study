
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card, Row, Col, Input, Spin, Button, message ,DatePicker,Checkbox} from 'antd';
import 'antd/dist/antd.css';

import { writeArticle, goToListArticle } from '../../store/modules/article';
import './Article.css';

const { TextArea } = Input;
const FormItem = Form.Item;

export default function ArticleWrite () {
    const seq = useSelector((state) => state.article.articleList).reduce( (acc, article) => {
        if(article.seq > acc.maxSeq) acc.maxSeq = article.seq;
        return acc;
    }, { maxSeq: 0 }).maxSeq + 1;

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const doWriteArticle = (values) => {
        dispatch(writeArticle({
            seq: seq,
            title: values.title,
            content: values.content,
            writer: '작성자' + seq,
            delState: false
        }));
        dispatch(goToListArticle());
    }

    return (
        <div id='articleWriteArea'>
            <Card>
                <Form form={form}
                    onFinish={doWriteArticle}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    name="dynamic_form_nest_item" autoComplete="off"
                >
                    <Row>
                        <Col span={8}>
                            <FormItem label="제목" name="title" rules={[{ require: true, message: '제목을 입력 해주세요.'}]}>
                                <Input maxLength={256} disabled={false} style={{ width: "350%" }} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem label="내용" name="content" rules={[{ require: true, message: '내용을 입력 해주세요.'}]}>
                                <TextArea showCount={true} rows={20} maxLength={1000} disabled={false} style={{ width: "350%", maxWidth: "350%" }} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit">저장</Button>
                </Form>
            </Card>
        </div>
    )
}