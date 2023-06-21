/**
 * 测试路由
 */
import { routerInterFace } from '@/interface/routerInterFace'
import { RouteRecordRaw } from 'vue-router'
type routerConfig = routerInterFace & RouteRecordRaw

export default [{
    path: '/dataFile',
    name: 'dataFile',
    redirect: '/storeData',
    meta: { title: '数据档案', icon: 'HomeOutlined' },
    children: [
        {
            path: '/storeData',
            name: 'storeData',
            component: () => import('@/views/dataFile/storeData/index.vue'),
            meta: { title: '店铺指标数据' },
        },
        {
            path: '/shopGoodsData',
            name: 'shopGoodsData',
            component: () => import('@/views/dataFile/shopGoodsData/index.vue'),
            meta: { title: '店铺货品指标数据' },
        },
        {
            path: '/fileRecord',
            name: 'fileRecord',
            component: () => import('@/views/dataFile/fileRecord/index.vue'),
            meta: { title: '文件记录' },
        }
    ]
}]