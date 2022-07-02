import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('概览', 'menu1'),
  getItem('数据资产授权', 'menusub1', null, [
    getItem('服务器资源管理', 'menu2'),
    getItem('数据资产授权', 'menu3'),
  ]),
  getItem('敏感数据发现', 'menusub2', null, [
    getItem('敏感数据资产', 'menu4'),
    getItem('敏感数据搜索', 'menu5'),
    getItem('识别任务监控', 'menu6'),
    getItem('识别规则', 'menu7'),
  ]),
];

export default items;
