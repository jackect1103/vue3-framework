/**
 * @name: index
 * @author: 黄俊炎
 * @date: 2022-08-09 15:52
 * @description：index
 * @update: 2022-08-09 15:52
 */
import { createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import { constantRoutes } from './routesConfig'
/**
 * 在meta对象中添加parentName记录，当前所有路由路径
 * @param fullRoutes 
 * @param curRoute 
 * @returns 
 */
const addParentName = (fullRoutes: any,curRoute?:any) => {
  let routers = [] as any
  fullRoutes.forEach((e:any ) => {
    if (curRoute) {
      if (curRoute.meta && e.meta && curRoute.meta.parentName) {
        e.meta['parentName'] = [...curRoute.meta.parentName,curRoute.name]
      } else {
        e.meta['parentName'] = [curRoute.name]
      }
    }
    if (e?.children && e?.children.length != 0) {
      e.children = [...addParentName(e?.children,e)]
    }
    routers.push(e)
  })
  return routers
}
const router = createRouter({
  history: createWebHistory(),
  routes:addParentName(constantRoutes),
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  next()
})

export  {
  router,
  constantRoutes
}
