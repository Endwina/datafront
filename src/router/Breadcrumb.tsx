import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbNameMap: Record<string, string> = {
  '/info': '概览',
  '/data-asset-authorization': '数据资产授权',
  '/data-asset-authorization/server-resource-management': '服务器资源管理',
  '/data-asset-authorization/data-asset-authorization': '数据资产授权',
  '/sensitive-data-discovery': '敏感数据发现',
  '/sensitive-data-discovery/sensitive-data-assets': '敏感数据资产',
  '/sensitive-data-discovery/sensitive-data-search': '敏感数据搜索',
  '/sensitive-data-discovery/identification-monitoring': '识别任务监控',
  '/sensitive-data-discovery/rules-of-recognition': '识别规则',
};

const useBreadCrumb = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  // const breadcrumbItems = [
  //     <Breadcrumb.Item key="home">
  //         <Link to="/">Home</Link>
  //     </Breadcrumb.Item>,
  // ].concat(extraBreadcrumbItems);

  return { breadcrumbItems };
};

export default useBreadCrumb;
