import { Breadcrumb, Button, Card, Form, Input, Select, Space } from "antd";
import "./index.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const {Option} = Select

export default function Publish(){


    return (
        <div className="publish">
            <Card 
                title={
                    <Breadcrumb items={[
                        { title: 'home' , href: '/system'},
                        {title: 'publish'},
                    ]}/>
                }
            >
                <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 16}}
                initialValues={{type: 1}}
                >
                    <Form.Item
                        label="标题"
                        name={"title"}
                        rules={[{required: true, message:"请输入文章标题"}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}}></Input>
                    </Form.Item>

                    <Form.Item
                        label="频道"
                        // name={"catagory"}
                        rules={[{required: true, message:"请输入文章所属类别"}]}
                    >
                        <Select placeholder="请输入文章所属类别" style={{width:400}}>
                            <Option value={0}>推荐</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item 
                    label="内容" 
                    // name={"content"} 
                    rules={[{required: true, message:"请输入文章内容"}]}
                    >
                        {/* 富文本编辑器 */}
                        <ReactQuill theme="snow" placeholder="请输入" />
                    </Form.Item>

                    {/* 提交按钮 */}
                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}