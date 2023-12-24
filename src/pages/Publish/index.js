import { Breadcrumb, Button, Card, Form, Input, Radio, Select, Space, Upload } from "antd";
import "./index.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { createArticleAPI, getChannelAPI } from "@/apis/article";
import { PlusOutlined } from '@ant-design/icons';

const {Option} = Select


export default function Publish(){
    // 获取频道列表
    const [channelList, setChannelList] = useState([])
    useEffect(
        ()=>{
            // 1。封装函数，调用接口
            const getChannelList =  async ()=>{
                const res = await getChannelAPI()
                setChannelList(JSON.parse(res.data))
            }
            // 调用函数
            getChannelList()
        },[]
    )

    // 提交表单
    function onFinish(formValue){
        console.log(formValue);
        const {title, category,content} = formValue
        // 格式化收集到的数据
        const data= {
            title: title,
            content: content,
            cover:{
                article_type: 0,
                images: [{a: "123"}]
            },
            category: category
        }
        // 调用POST发起请求
        createArticleAPI(data)
    }
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
                onFinish={onFinish}
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
                        name={"category"}
                        rules={[{required: true, message:"请输入文章所属类别"}]}
                    >
                        <Select placeholder="请输入文章所属类别" style={{width:400}}>
                            {/* <Option value={0}>推荐</Option> */}
                            {/* 下面一句这里value：当选中时，返回value */}
                            {channelList.map(item=> <Option key={item} value={item}>{item}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="article_type">
                            <Radio.Group>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Upload
                        listType="picture-card"
                        showUploadList
                        action={""}
                        name="image"
                        >
                            <div style={{marginTop: 8}}>
                                <PlusOutlined/>
                            </div>
                        </Upload>
                    </Form.Item>
                    

                    <Form.Item 
                    label="内容" 
                    name={"content"} 
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