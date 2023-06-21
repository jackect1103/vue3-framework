/**
 * 测试路由
 */
import { routerInterFace } from '@/interface/routerInterFace'
import { RouteRecordRaw } from 'vue-router'
type routerConfig = routerInterFace & RouteRecordRaw

export default [{
    path: '/basicDataManage',
    name: 'basicDataManage',
    redirect: '/storeData',
    meta: { title: '基础数据管理', icon: 'HomeOutlined' },
    children: [
        {
            path: '/platformInd',
            name: 'platformInd',
            component: () => import('@/views/basicDataManage/platformInd/index.vue'),
            meta: { title: '平台店铺指标' },
        },
        {
            path: '/classification',
            name: 'classification',
            component: () => import('@/views/basicDataManage/classification/index.vue'),
            meta: { title: '指标分类' },
        },
        {
            path: '/file',
            name: 'file',
            component: () => import('@/views/basicDataManage/file/index.vue'),
            meta: { title: '文件管理' },
        },
        {
            path: '/account',
            name: 'account',
            component: () => import('@/views/basicDataManage/account/index.vue'),
            meta: { title: '账号管理' },
        },
        {
            path: '/systemPlatform',
            name: 'systemPlatform',
            component: () => import('@/views/basicDataManage/systemPlatform/index.vue'),
            meta: { title: '系统平台管理' },
        }
    ]
}]