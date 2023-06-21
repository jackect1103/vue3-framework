/**
 * 测试路由
 */
import { routerInterFace } from '@/interface/routerInterFace'
import { RouteRecordRaw } from 'vue-router'
type routerConfig = routerInterFace & RouteRecordRaw

const testRouter : routerConfig= {
    path: '/test',
    name: 'test',
    redirect: '/test',
    meta: { title: '测试', icon: 'HomeOutlined', noShowMenu: true },
    children: [
        {
            path: '/test',
            name: 'test',
            component: () => import('@/views/test/test.vue'),
            meta: { title: '测试页面',  noShowMenu: true },
        },
        {
            path: '/formTest',
            name: 'formTest',
            component: () => import('@/views/test/formTest.vue'),
            meta: { title: '测试表单页面',  noShowMenu: true },
        },
    ]
}

export default testRouter