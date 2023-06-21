/**
 * @name: layout
 * @author: 黄俊炎
 * @date: 2022-08-10 17:13
 * @description：layout
 * @update: 2022-08-10 17:13
 */
import { defineStore } from 'pinia'

interface StateProps {
  projectName: string
  isSpreading: boolean,
  fullRoutes:string[],
  excludeKeepAlive:string[],
  openKeys?:string[],
  selectedKeys?:string[],
}
/**
 * defineStore 接收两个参数
 *  id: 唯一的标识, string 类型. Pinia 使用 id 与开发者工具建立联系
 *  第二个参数可以是一个函数, 也可以是一个对象.
 */
export const useSettingStore = defineStore('setting',{
  
  state: (): StateProps => ({
    projectName: import.meta.env.VITE_PROJECT_NAME,
    isSpreading: false,
    fullRoutes:[],
    excludeKeepAlive:[], // 是否需要缓存
    openKeys:[], // 当前展开的 SubMenu 菜单项 key 数组
    selectedKeys:[], // 当前选中的菜单项 key 数组
  }),

  actions: {
    /**
     * 导航折叠
     */
    changeIsSpreading() {
      this.isSpreading = !this.isSpreading
    },
    /**
     * 设置导航所有路由
     * @param data 
     */
    setAMenuFullRoutes(data:any) {
      data && (this.fullRoutes = [...data])
    },
    /**
     * 设置导航是否需要缓存
     * @param data 
     */
    setExcludeKeepAlive(data:any) {
      data && (this.excludeKeepAlive = [...data])
    },
    /**
     * 设置导航当前展开的 SubMenu 菜单项 key 数组
     * @param data 
     */
    setOpenKeys(data:any) {
      data && (this.openKeys = [...data])
    },
    /**
     * 设置导航当前选中的菜单项 key 数组
     * @param data 
     */
    setSelectedKeys(data:any) {
      data && (this.selectedKeys = [...data])
    }
  }
})
