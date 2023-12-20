import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout as ReactLayout, Menu, theme } from 'antd';
const { Header, Content, Sider } = ReactLayout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });


const Layout = ()=>{

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();


    return (
        <ReactLayout style={{margin:'0'}}>
            <Header
                style={{
                display: 'flex',
                alignItems: 'center',
                padding: "0"
                }}
            >
                <div className="demo-logo" 
                style={{color:'red', backgroundColor:"white", }}>手写头像
                </div>
                <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items1}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
                />
            </Header>
        
    
    
    
            {/* 左侧侧边栏 */}
            <ReactLayout>
                <Sider
                width={200}
                style={{
                    background: colorBgContainer,
                    // margin: "0px"
                }}
                // breakpoint="lg"
                // collapsedWidth="0"
                // onBreakpoint={(broken) => {
                //   console.log(broken);
                // }}
                // onCollapse={(collapsed, type) => {
                //   console.log(collapsed, type);
                // }}

                >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{
                    height: '100%',
                    borderRight: 0,
                    }}
                    items={items2}
                />
                </Sider>
                <ReactLayout
                style={{
                    padding: '0 24px 24px',
                }}
                >
                <Breadcrumb
                    style={{
                    margin: '16px 0',
                    }}
                >
                    {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item> */}
                </Breadcrumb>



                {/* 内容区域 */}
                <Content
                    style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    // height: 
                    }}
                >
                    Content
                </Content>
            </ReactLayout>
            </ReactLayout>

        </ReactLayout>
    );
    }

export default Layout