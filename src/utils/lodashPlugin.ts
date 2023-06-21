import type { App } from 'vue'
// import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
/**
 * 注册lodash全局事件
 */
export const setupLodashGlobal = (app: App<Element>): void => {
    app.config.globalProperties.$debounce = debounce
  }