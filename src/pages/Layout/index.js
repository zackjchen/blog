import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout as ReactLayout, Menu, theme } from 'antd';
import "./index.scss"






const { Header, Content, Footer, Sider } = ReactLayout;
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


const Layout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <ReactLayout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          className='menu'
        />
      </Header>
      <Content
        className='content'
      >
        <Breadcrumb
          className='breadcrumb'
          // items = {
          //   [{title:"Home"}, {title:"List"}, {title:"App"}]
          // }
        >

          
        </Breadcrumb>
        <ReactLayout
          className='reactlayout'
          style={{
            // padding: '24px 0',
            // background: colorBgContainer,
            // borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </ReactLayout>
      </Content>
      <Footer
        className='footer'
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </ReactLayout>
  );
};
export default Layout