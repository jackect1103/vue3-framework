import dataFileRouter from './dataFile/index'
import taskManageRouter from './taskManage/index'
import basicDataManageRouter from './basicDataManage/index'
import TestRouter from './test-routers'
/**
 * 业务模块路由
 */
export default [
    ...dataFileRouter,
    ...taskManageRouter,
    ...basicDataManageRouter,
    TestRouter
]
