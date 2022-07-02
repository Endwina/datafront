import { Breadcrumb, Layout, Menu } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import useBreadCrumb from '@/router/Breadcrumb';

import menuItems from './menuItems';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { breadcrumbItems } = useBreadCrumb();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Header className="site-layout-background" style={{ color: 'white' }}>
          数据海关
        </Header>
        <Menu
          onClick={({ key }) => {
            switch (key) {
              case 'menu1':
                navigate('/info');
                break;
              case 'menu2':
                navigate('/data-asset-authorization/server-resource-management');
                break;
              case 'menu3':
                navigate('/data-asset-authorization/data-asset-authorization');
                break;
              case 'menu4':
                navigate('/sensitive-data-discovery/sensitive-data-assets');
                break;
              case 'menu5':
                navigate('/sensitive-data-discovery/sensitive-data-search');
                break;
              case 'menu6':
                navigate('/sensitive-data-discovery/identification-monitoring');
                break;
              case 'menu7':
                navigate('/sensitive-data-discovery/rules-of-recognition');
                break;
              default:
                break;
            }
          }}
          theme="dark"
          defaultSelectedKeys={['menu1']}
          defaultOpenKeys={['menusub1', 'menusub2']}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>数据安全中心 ©2022</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
