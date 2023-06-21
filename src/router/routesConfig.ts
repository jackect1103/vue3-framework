/**
 * @name: routesConfig
 * @author: 黄俊炎
 * @date: 2022-08-09 15:53
 * @description：routesConfig
 * @update: 2022-08-09 15:53
 */

import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
// 业务路由
import BusinessRouter from './modules'

// @ts-ignore
/**
 * 静态路由
 */
export const constantRoutes: Array<RouteRecordRaw> = [
  // 需要展示在左侧廊
  {
    path: '/',
    component: Layout,
    redirect: '/dataFile',
    children: BusinessRouter,
    meta: { title: '' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: { title: '登录' },
  },
  {
    // vue3中对404配置进行了修改,必须要使用正则匹配
    path: '/:pathMatch(.*)*',//匹配未定义的路由
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
    meta: { title: '' }
  }
]
