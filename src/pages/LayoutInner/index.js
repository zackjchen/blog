
import './index.scss'
import React, { useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo, featchUserInfo } from '@/store/modules/user';


const { Header, Content, Sider } = Layout;
const text = 'Are you sure to delete this task?';
const description = 'Delete the task';



const LayoutInner = () => {
  const navgate = useNavigate()

  const dispath = useDispatch()
  useEffect(
    ()=>{
      dispath(featchUserInfo(navgate))
    },[dispath, navgate]
  )

  const userinfo = useSelector(state => state.user.userInfo)
  // console.log(userinfo);



  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


    // 点击一级标题
  function handleH1({key}){
    console.log("一级标题 click",key);
    navgate(key)
  }

  // 点击二级标题
  function handleH2(key){
    console.log("二级标题 click",key);

  }


  const onConfirm = ()=>{
    console.log("确定退出");
    dispath(clearUserInfo())
    navgate("/login")
  }

  // const items1 = ['1', '2', '3','username','logout'].map((key) => ({
  //   key,
  //   label: `nav ${key}`,
  // }));

  const items1 = [
    {
      label: 'Navigation One',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: 'Navigation Two',
      key: 'app',
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: 'Settings',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      label: userinfo.name,
      key: 'username',
      onClick: ()=>navgate("/")

    },
    {
      label: (<Popconfirm
              placement="bottomRight"
              title={text}
              description={description}
              okText="Yes"
              cancelText="No"
              onConfirm={onConfirm}
            >
              <div>退出登陆</div>
            </Popconfirm>
            ),
      key: 'logout',
      // onClick: ()=>navgate("/login")
    },
  ];


  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    // 将key换成路由
    const router_map = {
      1 : "/system/home",
      2 : "/system/article",
      3 : "/system/publish",
    }
    // console.log("key",router_map[key]);

    return {
      // key: `sub${key}`,
      key: router_map[key],
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      onTitleClick: handleH1,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });




  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
 
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            // SekectedKey=上面items的key时会高亮
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            onClick={({key})=>handleH2(key)}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default LayoutInner;