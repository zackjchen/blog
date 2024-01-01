import { Breadcrumb, Button, Card, Form, Input, Radio, Select, Space, Upload } from "antd";
import "./index.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { createArticleAPI, getArticleById } from "@/apis/article";
import { PlusOutlined } from '@ant-design/icons';
import useChannelList from "@/hooks/useChannel";
import { useSearchParams } from "react-router-dom";

const {Option} = Select


export default function Publish(){

    const {channelList} = useChannelList()
    // 上传回调
    const [imageList, setImageList] = useState([])
    function onChange(data){
        console.log(data);
        setImageList(data.fileList)
    }

    // 提交表单
    function onFinish(formValue){
        const {title, category, content, image_type} = formValue
        const images_paths = []
        for( let i in imageList){
            for(let j in imageList[i].response.data){
                images_paths.push( imageList[i].response.data[j])
            }
        }

        // 格式化收集到的数据
        const data= {
            title: title,
            content: content,
            cover:{
                image_type: image_type, //表示传多少张图片
                images: images_paths
            },
            category: category
        }
        // 调用POST发起请求
        createArticleAPI(data)
    }


    // 封面传多少图片类型
    const [imageType, setImageType] = useState(0)
    function onTypeChange(e){
        setImageType(e.target.value)
    }

    // 回填数据,通过search获取id
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get("id")
    // 获取Form实例
    const [form] = Form.useForm()
    useEffect(()=>{
        // 1.通过id获取数据
        async function getArticleDetail(){
            const res = await getArticleById(articleId)
            console.log(res.data);
            form.setFieldsValue({
                ...res.data,
                image_type: res.data.cover.image_type
            })

            setImageType(res.data.cover.image_type)
            setImageList(res.data.cover.images.map(url=>{
                console.log(url);
                // 这里返回的类型 [{url:"/path"}]
                return {url: url}
            }))
        }
        // 2.调用实例方法完成回填
        if (articleId){
            getArticleDetail()   
        } 
    },[articleId,form])

    return (
        <div className="publish">
            <Card 
                title={
                    <Breadcrumb items={[
                        { title: 'home' , href: '/system'},
                        {title: `${articleId  ? '编辑':'发布'}文章`},
                    ]}/>
                }
            >
                <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 16}}
                initialValues={{image_type: 0}}
                onFinish={onFinish}
                form={form}
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
                    <Form.Item label="封面" >
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
                        fileList={imageList}
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