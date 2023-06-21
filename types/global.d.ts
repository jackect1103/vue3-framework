import { ComponentCustomProperties as VComponentCustomProperties } from 'vue'

// import * as lodash from 'lodash'

/**
 * @name: global.d
 * @author: 黄俊炎
 * @date: 2022-08-13 00:28
 * @description：global.d
 * @update: 2022-08-13 00:28
 */

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends VComponentCustomProperties {
    $message: typeof message
    $modal: typeof Modal
  }
}
//
// declare global {
//   // 全局变量设置
//   const _: typeof lodash
// }
//
// declare module 'lodash'
