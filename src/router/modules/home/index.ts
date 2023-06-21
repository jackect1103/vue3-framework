/**
 * 测试路由
 */
import { routerInterFace } from '@/interface/routerInterFace'
import { RouteRecordRaw } from 'vue-router'
type routerConfig = routerInterFace & RouteRecordRaw

const testRouter : routerConfig= {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页', icon: 'ProfileOutlined' },
}

export default testRouter