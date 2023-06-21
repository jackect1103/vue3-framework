/**
 * @name: 其他菜单 -- 左侧栏不展示的
 * @author: Leo
 * @date: 2022-11-03 10:53
 * @description：informationRoutes
 * @update: 2022-11-03 10:53
 */
 export default [
   {
     path: '/information/patrol-manage/patrol/add',
     name: 'addClue',
     meta: {
       title: '添加',
     },
     component: () => import('@/views/information/patrol-manage/detail.vue')
   },
   {
     path: '/information/patrol-manage/patrol/edit/:id',
     name: 'editClue',
     meta: {
       title: '编辑',
       closable: true
     },
     component: () => import('@/views/information/patrol-manage/detail.vue')
   },
   {
     path: '/information/patrol-manage/patrol/detail/:id',
     name: 'detailClue',
     meta: {
       title: '详情',
       closable: true
     },
     component: () => import('@/views/information/patrol-manage/detail.vue')
   },
   {
     path: '/information/evaluate-manage/evaluate/add',
     name: 'addEvaluate',
     meta: {
       title: '添加',
     },
     component: () => import('@/views/information/evaluate-manage/detail.vue')
   },
   {
     path: '/information/evaluate-manage/evaluate/edit/:id',
     name: 'editEvaluate',
     meta: {
       title: '编辑',
       closable: true
     },
     component: () => import('@/views/information/evaluate-manage/detail.vue')
   },
   {
     path: '/information/evaluate-manage/evaluate/detail/:id',
     name: 'detailEvaluate',
     meta: {
       title: '详情',
       closable: true
     },
     component: () => import('@/views/information/evaluate-manage/detail.vue')
   },
   {
     path: '/information/evaluate-manage/evaluate/assess/:id',
     name: 'assessEvaluate',
     meta: {
       title: '评价',
       closable: true
     },
     component: () => import('@/views/information/evaluate-manage/assess.vue')
   },
   {
     path: '/information/evaluate-manage/evaluate/verify/:id',
     name: 'verifyEvaluate',
     meta: {
       title: '审核',
       closable: true
     },
     component: () => import('@/views/information/evaluate-manage/verify.vue')
   },
 ]
 