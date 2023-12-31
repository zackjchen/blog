import { Table, Tag, Space, Card,Button,Popconfirm } from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
// import img404 from '@/assets/error.png'
import { deleteArticlesAPI, getArticlesAPI } from "@/apis/article";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleUnit = (params)=> {
    // const data = [{
    //     id:"8218",
    //     comtent_count:"0",
    //     cover:{
    //         images:[]
    //     },
    //     like_count:0,
    //     publish_date:"2023-12-27 21:05:14",
    //     read_count:2,
    //     title: "wkwebview离线加载h5资源结局方案"
    // }]


       // 获取文章列表
    const [articles,setArticles] = useState([])
    const navgate = useNavigate()
    useEffect(()=>{
           async function get_articles(){
               const res = await getArticlesAPI(params.reqData)
               setArticles(res.data.data)

           }
           get_articles()
       },[params.reqData])
    console.log(articles);
    const columns = [
        {
          title: '封面',
          dataIndex: 'images',
          key: 'images',
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => {
                let color = status === 1 ? "green" : (status===0? "geekblue": "red")
                let status_description = status === 1 ? "审核通过" : (status=== 0? "审核中": "审核不通过")
                return (
                    <Tag color={color} key={status}>
                      {status_description}
                    </Tag>
                  );

            }
        },
        {
            title: '发布时间',
            dataIndex: 'publish_date',
            key: 'publish_date',
        },
        {
            title: '点赞数',
            dataIndex: 'like_count',
            key: 'like_count',
        },
        {
            title: '阅读数',
            dataIndex: 'read_count',
            key: 'read_count',
        },
        {
            title: '评论数',
            dataIndex: 'comtent_count',
            key: 'comtent_count',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>{navgate(`/system/publish?${record.id}`)}}></Button>
                <Popconfirm
                    title="Delete the article"
                    description="Are you sure to delete this article?"
                    onConfirm={()=>onConfirm(record)}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} danger></Button>
                </Popconfirm>
              </Space>
            ),
          },
    ];

    const onConfirm = async (data)=>{
        console.log(data.id);
        // 这里调取删除文章接口
        await deleteArticlesAPI(data.id).then(
            (data)=>{console.log(data.data);}
        )
        params.setReqData({
            ...params.reqData
        })
    }

    const onPageChange = (page)=>{
        // 点击页号的动作
        params.setReqData({
            ...params.reqData,
            page: page.current
        })
    }
    return (
        <div>
            <Card title={`根据条件查询到 ${articles.length} 条结果`}>
                <Table rowKey={"id"} columns={columns} dataSource={articles} pagination={{
                    total: articles.length,
                    pageSize: params.reqData.per_page,
                    // onChange: onPageChange
                }} 
                onChange={onPageChange}
                ></Table>
            </Card>
        </div>
    )
}

export default ArticleUnit