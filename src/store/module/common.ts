/**
 * @name: layout
 * @author: 黄俊炎
 * @date: 2022-08-10 17:13
 * @description：layout
 * @update: 2022-08-10 17:13
 */
import { defineStore } from 'pinia'
import API from '@/api/index'

type strOrNum = string | number
interface deptTreeInterFace {
    "id": strOrNum,
    "parentId": strOrNum,
    "deptcode": strOrNum,
    "deptname": strOrNum,
    "creater": strOrNum,
    "createtime": strOrNum,
    "principalName": strOrNum,
    "member": strOrNum,
    "value": strOrNum,
    "label": strOrNum,
    "children": deptTreeInterFace
}
interface StateProps {
    deptTree: Array<deptTreeInterFace>
    oaStoreList: any
    channelsList: any
    productList: any
}
/**
 * defineStore 接收两个参数
 *  id: 唯一的标识, string 类型. Pinia 使用 id 与开发者工具建立联系
 *  第二个参数可以是一个函数, 也可以是一个对象.
 */
export const useCommonStore = defineStore('common', {

    state: (): StateProps => ({
        deptTree: [],//部门
    }),

    actions: {
        /**
         * 获取部门树级结构
         */
        async setDeptTree() {
            try {
                if (this.deptTree.length == 0) {
                    let { code, data } = await API.deptTree()
                    if(code == 0 ) {
                        this.deptTree = formattingData(data)
                    }
                }
            } catch (error) {
                console.error('获取部门树级结构', error)
            }
        }
    }
})

/**
 * 数据格式
 * @param data 
 * @returns 
 */
function formattingData(data:Array<deptTreeInterFace>) {
    let list = [] as Array<deptTreeInterFace>
    data.forEach(e => {
        if(e.children) {
            e.children = formattingData(e.children)
        }
        list.push({
            ...e,
            label:e.deptname,
            value:e.id
        })
    })
    return list
}