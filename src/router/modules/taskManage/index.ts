/**
 * 测试路由
 */
import { routerInterFace } from '@/interface/routerInterFace'
import { RouteRecordRaw } from 'vue-router'
type routerConfig = routerInterFace & RouteRecordRaw

export default [{
    path: '/taskManage',
    name: 'taskManage',
    redirect: '/taskPlan',
    meta: { title: '任务管理', icon: 'HomeOutlined' },
    children: [
        {
            path: '/taskPlan',
            name: 'taskPlan',
            component: () => import('@/views/taskManage/taskPlan/index.vue'),
            meta: { title: '任务计划' },
        },
        {
            path: '/taskList',
            name: 'taskList',
            component: () => import('@/views/taskManage/taskList/index.vue'),
            meta: { title: '任务列表' },
        }
    ]
}]