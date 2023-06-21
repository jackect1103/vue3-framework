/**
 * @name: useSiderMenu
 * @author: 黄俊炎
 * @date: 2022-08-11 23:41
 * @description：useSiderMenu
 * @update: 2022-08-11 23:41
 */
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingStore } from '@/store/module/setting';

const ENV = import.meta.env.MODE
let existingMenu = []
/**
 * 菜单校验
 * @param[Array] fullRoutes 项目所有菜单路由
 */
const handleMenuCheck = (fullRoutes: any) => {
  let routers = [] as any
  fullRoutes.forEach((e: any) => {
    // noShowMenu - 不展示到侧边栏
    let flag = ['Home', 'NotFound'].includes(e.name) ? true : e.meta && !('noShowMenu' in e.meta)
    // 判断路由是否需要展示到左侧栏 
    if (flag) {
      // 判断是否有子路由
      if (e?.children) {
        e.children = [...handleMenuCheck(e?.children)]
        e.children.length != 0 && routers.push(e)
      } else {
        if (ENV == 'production') {
          // 校验是否有权限
          if (existingMenu.includes(e.path)) {
            routers.push(e)
          }
        } else {
          routers.push(e)
        }
      }


    }
  })
  return routers
}

/**
 * keepAlive
 * 获取所有不缓存的组件
 * @param fullRoutes 
 * @returns 
 */
const getExcludeKeepAlive = (fullRoutes: any) => {
  let excludeKeepAlive: string[] = []
  fullRoutes.forEach((e: any) => {
    if (e.meta && 'keepAlive' in e.meta && !e.meta.keepAlive) excludeKeepAlive.push(e.name);
    if (e?.children && e?.children.length != 0) {
      excludeKeepAlive.push(...getExcludeKeepAlive(e?.children))
    }
  })
  return excludeKeepAlive
}

const useSiderMenu = () => {
  // 不缓存的组件
  const router = useRouter()
  const currRoute = useRoute()
  const settingStore = useSettingStore()
  let fullRoutes = computed(() => router.options.routes)
  // 当前用户拥有的权限路由
  let permissionsList = localStorage.getItem('permissions')
  existingMenu = JSON.parse(permissionsList) || []
  fullRoutes = handleMenuCheck(fullRoutes.value) as any


  // 当前展开的 SubMenu 菜单项 key 数组
  let openKeys = ref(currRoute.meta.parentName)
  // 当前选中的菜单项 key 数组
  let selectedKeys = ref([currRoute.name])
  let excludeKeepAlive = []
  excludeKeepAlive = getExcludeKeepAlive(fullRoutes)
  
  // 设置导航所有路由
  settingStore.setAMenuFullRoutes(fullRoutes)
  // 设置导航是否需要缓存
  settingStore.setExcludeKeepAlive(excludeKeepAlive)
  settingStore.setOpenKeys(openKeys.value)
  settingStore.setSelectedKeys(selectedKeys.value)
  watch(
    () => currRoute.name,
    (n) => {
      if (n === selectedKeys.value[0]) return
      selectedKeys.value = [n] as string[]
      settingStore.setSelectedKeys(selectedKeys.value)
    }
  )

}

export default useSiderMenu
