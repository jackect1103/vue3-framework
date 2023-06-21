/**
 * isRef：检查一个对象是否为 ref 包装过的对象。
 * shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
 *   如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
 * shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。
 *   如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。
 */
import { ref } from 'vue'
import { pageEventInterFace } from './interface'
import {
  paginationInterFace,
} from '@/interface/tableInterFace'
export default function useTable() {
  let pagination = ref<paginationInterFace>({
    total: 200, // 总数据量
    current: 1, // 当前页数
    pageSize: 20, // 每页条数
    pageSizeOptions: ['10', '20', '30'],//可选的页面显示条数
    showQuickJumper: true, //是否可以快速跳转至某页
    showSizeChanger: true, //是否可以改变pageSize
    showTotal: total => `共${total}条`, //展示每页第几条至第几条和总数
  })
  // 搜索参数
  let searchParams: pageEventInterFace = {
    pageIndex: 0,
    pageSize: 0,
    field: '',
    sortType: '',
  }
  /**
   * 分页事件
   * @param page 分页
   * @param filters 筛选
   * @param sorter 排序
   * @param source 数据源
   */
  const onTableChange = (page, filters, sorter, source) => {
    if (page) {
      page.current && (pagination.value.current = page.current)
      page.pageSize && (pagination.value.pageSize = page.pageSize)
      searchParams.pageIndex = page.current;
      searchParams.pageSize = page.pageSize;
    }
    // 排序
    if (sorter.order) {
      searchParams.field = sorter.field;
      searchParams.sortType = sorter.order;
    } else {
      searchParams.field = undefined;
      searchParams.sortType = undefined;
    }
  }

  return {
    pagination,
    searchParams,
    onTableChange
  }
} 