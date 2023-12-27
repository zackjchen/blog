import { Breadcrumb, Button, Card, Form, Input, Radio, Select, Space, Upload } from "antd";
import "./index.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { createArticleAPI } from "@/apis/article";
import { PlusOutlined } from '@ant-design/icons';
import useChannelList from "@/hooks/useChannel";

const {Option} = Select


export default function Publish(){

    const {channelList} = useChannelList()
    // 上传回调
    const [imageList, setImageList] = useState([])
    function onChange(data){
        setImageList(data.fileList)
    }

    // 提交表单
    function onFinish(formValue){
        const {title, category, content, image_type} = formValue
        console.log(imageList);

        // 格式化收集到的数据
        const data= {
            title: title,
            content: content,
            cover:{
                image_type: image_type, //表示传多少张图片
                images: imageList.map(item=>item.response.data)
            },
            category: category
        }
        // 调用POST发起请求
        console.log(data);
        createArticleAPI(data)
    }



    // 封面传多少图片类型
    const [imageType, setImageType] = useState(0)
    function onTypeChange(e){
        setImageType(e.target.value)
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
                initialValues={{image_type: 0}}
                onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name={"title"}
                        rules={[{required: true, message:"请输入文章标题"}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}} value={""}></Input>
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
                        <Form.Item name="image_type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                    {
                        imageType>0 && 
                        <Upload
                        // 选择文件框的样式
                        listType="picture-card"
                        // 显示上传的图片
                        showUploadList 
                        action={"http://localhost:3001/articles/upload"}
                        name="image"
                        onChange={onChange}
                        maxCount={imageType}
                        >
                            <div style={{marginTop: 8}}>
                                <PlusOutlined/>
                            </div>
                        </Upload>
                    }
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