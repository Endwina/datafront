import { Spin } from 'antd';
import React, { Suspense, useCallback } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import HomePage from '@/pages/HomePage';
import SignUpIn from '@/pages/SignUpIn';
import { userType } from '@/store';

import type { routerConfigType } from './routerConfigType';

const RulesOfRecognition = React.lazy(() => import('@/pages/RulesOfRecognition'));

const routeConfig: routerConfigType[] = [
  {
    path: '/*',
    element: <HomePage />,
    auth: [1, 9, 8, 7, 'user1'],
    children: [
      {
        path: '',
        auth: [1, 9, 8, 7, 'user1'],
        element: <Navigate to="info" replace></Navigate>,
      },
      {
        path: 'info',
        auth: [1, 9, 8, 7, 'user1'],
        element: (
          <Suspense fallback={<Spin size="large" />}>
            <div>概览</div>
          </Suspense>
        ),
      },
      {
        path: 'data-asset-authorization/*',
        auth: [1, 9, 8, 7, 'user1'],
        children: [
          {
            path: '',
            auth: [1, 9, 8, 7, 'user1'],
            element: <Navigate to="server-resource-management" replace></Navigate>,
          },
          {
            path: 'server-resource-management',
            auth: [1, 9, 8, 7, 'user1'],
            element: (
              <Suspense fallback={<Spin size="large" />}>
                <div>服务器资源管理</div>
              </Suspense>
            ),
          },
          {
            path: 'data-asset-authorization',
            auth: [1, 9, 8, 7, 'user1'],
            element: (
              <Suspense fallback={<Spin size="large" />}>
                <div>数据资产授权</div>
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'sensitive-data-discovery/*',
        auth: [1, 9, 8, 7, 'user1'],
        children: [
          {
            path: '',
            auth: [1, 9, 8, 7, 'user1'],
            element: <Navigate to="sensitive-data-assets" replace></Navigate>,
          },
          {
            path: 'sensitive-data-assets',
            auth: [1, 9, 8, 7, 'user1'],
            element: (
              <Suspense fallback={<Spin size="large" />}>
                <div>敏感数据资产</div>
              </Suspense>
            ),
          },
          {
            path: 'sensitive-data-search',
            auth: [1, 9, 8, 7, 'user1'],
            element: (
              <Suspense fallback={<Spin size="large" />}>
                <div>敏感数据搜索</div>
              </Suspense>
            ),
          },
          {
            path: 'identification-monitoring',
            auth: [1, 9, 8, 7, 'user1'],
            element: (
              <Suspense fallback={<Spin size="large" />}>
                <div>识别任务监控</div>
              </Suspense>
            ),
          },
          {
            path: 'rules-of-recognition',
            auth: [1, 9, 8, 7, 'user1'],
            element: (
              <Suspense fallback={<Spin size="large" />}>
                <RulesOfRecognition />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '404',
    element: <div>路径错误,用户未登录或用户权限不够</div>,
  },
  {
    path: 'login',
    element: <SignUpIn />,
  },
];

function MyRoutes() {
  const currentUserType = useRecoilValue(userType);
  /**
   * @description: 路由配置列表数据转换
   * @param {routeConfig} routeConfig 路由配置
   */
  const transformRoutes = useCallback(
    (routeList: typeof routeConfig) => {
      const list: RouteObject[] = [];
      routeList.forEach((route: routerConfigType) => {
        if (route.path === undefined) {
          return null;
        }
        if (
          route.path !== '404' &&
          route.auth !== undefined &&
          route.auth.find((item) => item === currentUserType) === undefined
        ) {
          route.element = <Navigate replace to="404"></Navigate>;
        }
        if (route.children) {
          route.children = transformRoutes(route.children);
        }

        list.push(route);
      });
      return list;
    },
    [currentUserType],
  );

  const getRoutes = useRoutes(transformRoutes(routeConfig));
  return <>{getRoutes}</>;
}
export default MyRoutes;
