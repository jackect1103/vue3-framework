import { createApp } from 'vue'
import piniaPersist from 'pinia-plugin-persist'
import moment from 'moment'
import dayjs from 'dayjs'
import 'amfe-flexible'
import 'dayjs/locale/zh-cn'
import objectSupport from 'dayjs/plugin/objectSupport'
import store from '@/store'
import { router } from '@/router'
import './styles/index.css'
import 'animate.css'
import { setupAntdComp, setupAntdIcon, setupAntdGlobal } from '@/utils/antdPlugin'
import { setupLodashGlobal } from '@/utils/lodashPlugin'
import permission from '@/utils/permission'
import comComponents from '@/components'
import API from '@/api/index'
import App from './App.vue'
const MODE = import.meta.env.MODE
console.log('MODE', MODE)
store.use(piniaPersist)
const app = createApp(App)
app.use(comComponents)
app.use(router)
app.use(store)

/**
 * 注册dayjs
 */
dayjs.extend(objectSupport)
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$moment = moment
app.config.globalProperties.$API = API

// 批量注册antd组件
setupAntdComp(app)
// antd-icon
setupAntdIcon(app)
// 全局组件
setupAntdGlobal(app)
// 注册lodash全局事件
setupLodashGlobal(app)


/**
 * To-Do
 * 调用权限接口
 */
if(MODE != 'development') {  // 测试环境、生产环境
  API.getAllRoute().then((res) => {
    localStorage.setItem(
      'permissions',
      res ? JSON.stringify(res.data) : JSON.stringify([])
    )
    //注册指令
    app.directive('permission', permission)
    app.mount('#app')
  })
}  else { // 本地开发环境
    //注册指令
    app.directive('permission', permission)
    app.mount('#app')
}
