<!-- 
  用例:
  <ComTable :pagination="pagination" :columns="columns" :dataSource="dataSource" @on-page="handlePage">
    <template #[item.slots.customRender]="scope" v-for="item in columns">
      <template v-if="item.dataIndex">{{ scope.scope.record[item.dataIndex] }}</template>
      <template v-if="item.dataIndex == 'operation'">
        <span style="color:red">操作</span>
      </template>
    </template>
  </ComTable>
-->

<template>
  <a-table  ref="table"
    :loading="loading"
    :dataSource="dataSource"
    :columns="columns"
    :row-key="(record: any) => record"
    :scroll="scroll"
    :pagination="showPage && pagination"
    :row-selection="isSelect ? rowSelection1 : null"
    @change="
      (page: any, filters: any, sorter: any, source: any) =>
        handlePage(page, filters, sorter, source)
    "
  >
  <template #[item]="scope" v-for="item in renderArr">
    <slot :name="item" :scope="scope"></slot>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { getCurrentInstance,onMounted ,watch, ref } from 'vue'
import {
  columnsItemInterFace,
  paginationInterFace,
} from '@/interface/tableInterFace'
import useTables from './useTables'

const { pagination, searchParams, onTableChange } = useTables()
const loading = ref(false)
/**
 * vue3 defineProps 引入定义的接口报错
 * https://segmentfault.com/q/1010000042014549?utm_source=sf-similar-question
 */
interface PropsInterFace {
  dataSource: columnsItemInterFace[] // 数据
  columns: columnsItemInterFace[] // 列表
  pagination?: paginationInterFace // 分页配置
  tableLoading?: boolean // 加载器
  showPage?: boolean // 是否展示分页
  scroll?: Object //
  isSelect?: boolean // 是否需要表格前面的选择按钮
}
const emits = defineEmits(['batch', 'on-page'])
const $props = withDefaults(defineProps<PropsInterFace>(), {
  dataSource: () => [],
  columns: () => [],
  tableLoading: false,
  showPage: true,
  isSelect: true,
  scroll: () => {
    return { x: 750,y:450 }
  },
  pagination: () => {
    return {
      total: 200,
      current: 1,
      pageSize: 20,
    }
  },
})
// 渲染需要自定义的列字段
let renderArr = ref<Array<String>>([])
watch(
  () => [$props.pagination, $props.tableLoading],
  (newValue) => {
    pagination.value = { ...pagination.value, ...newValue[0] }

    loading.value = newValue[1]
    renderArr.value = $props.columns.map((e) => e.dataIndex)
  },
  {
    deep: true,
    immediate: true,
  }
)

// 是否多选
const rowSelection1 = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    emits('batch', selectedRowKeys)
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
}
//分页
const handlePage = (page: any, filters: any, sorter: any, source: any) => {
  onTableChange(page, filters, sorter, source)
  emits('on-page', searchParams)
}

let tHeight = ref(450)
const calculateHeight = () => {
  tHeight.value = window.innerHeight - instance.ctx.$refs.table.$el.offsetTop - 80
}

let instance = ''
onMounted(() => {
  instance = getCurrentInstance()
  calculateHeight()
})
</script>

<style lang="less">
/*有固定行的ant-design-vue 表格滑动样式*/
.ant-table-fixed .ant-table-row-hover {
  background: #eef1f6 !important;
  color:rgb(24, 144, 255)!important;
}
.ant-table-fixed .ant-table-row-hover > td {
  background: #eef1f6 !important;
  color:rgb(24, 144, 255)!important;
}
/*没有固定行的表格个样式*/
.ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
  background-color: #e6f7ff !important;
  color:rgb(24, 144, 255)!important;
}
.ant-table-body .ant-table-row-hover {
  background: #e6f7ff  !important;
  color:rgb(24, 144, 255)!important;
}
.ant-table-body .ant-table-row-hover > td {
  background: #e6f7ff  !important;
  color:rgb(24, 144, 255)!important;
}

</style>