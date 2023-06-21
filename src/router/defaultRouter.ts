 import Layout from '@/layout/index.vue'
 import modulesRouters from './modules';

 /**
  * 默认路由 - 无需权限控制
  */
  export default [
    {
      path: '/',
      component: Layout,
      redirect: '/information/category-manage/platform-list',
      children: [
        {
          path: '/404',
          name: '404',
          meta: { title: '404', icon: 'HomeOutlined' },
          children: [
            {
              path: '/404',
              name: '404',
              component: () => import('@/views/404.vue'),
              meta: { title: '404', icon: 'HomeOutlined' },
            }
          ]
        },
        {
          path: '/:catchAll(.*)',
          component: () => import('@/views/404.vue')
        },

        // 其他模块路由 - 需要权限校验的路由
        ...modulesRouters
      ]
    },
  ]
 