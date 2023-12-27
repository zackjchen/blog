// 1.封装接口请求
// 2。使用useState维护状态数据
// 3.使用useEffect发送请求
// 4.在组件身上绑定对应的属性完成渲染

import { Link } from "react-router-dom";
import { Card, Breadcrumb, Form, Radio, DatePicker, Select, Button } from "antd";
import locale from "antd/es/date-picker/locale/en_US";
import ArticleUnit from "../ArticleUnit";
import useChannelList from "@/hooks/useChannel";



const {Option} = Select
const {RangePicker} = DatePicker
export default function ArticleList(){
    const {channelList} = useChannelList()
 

    return (
    <div>
        <Card
        title={
            <Breadcrumb items={
                [
                    {title:<Link to={"/system"}>首页</Link>},
                    {title:"文章列表"}
                ]
            }
            ></Breadcrumb>
        }
        style={{marginBottom:20, height:"330px"}}
        >
            <Form initialValues={{status:null}}>
                <Form.Item label="状态" name="status">
                    <Radio.Group>
                        <Radio value={0}>全部</Radio>
                        <Radio value={1}>草稿</Radio>
                        <Radio value={2}>审核通过</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="频道" name={"channel_id"}>
                    <Select placeholder="请选择文章频道"
                    initialvalues={{article_type:"Rust"}}
                    style={{width:120}}
                    >
                        
                        {channelList.map((item)=> <Option key={item} value={item}>{item}</Option> )}
                    </Select>
                </Form.Item>
                <Form.Item label="日期" name={"date"}>
                    <RangePicker locale={locale}></RangePicker>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{margin:10}} >查询</Button>
                </Form.Item>
            </Form>
            
        </Card>
        <ArticleUnit/>
    </div>
    )
}