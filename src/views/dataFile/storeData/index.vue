<template>
  <ComHeader>
    <ComSearch
      @handleSearch="handleSearch"
      :isNormal="true"
      @handleReset="handleReset"
    >
      <!-- 简单搜索 -->
      <a-form
        class="searchCom"
        layout="inline"
        :label-col="{ style: { width: '100px' } }"
        :wrapper-col="{ style: { width: '200px' } }"
      >
        <a-form-item :colon="false">
          <a-input
            allowClear
            v-model:value="searchParams.value"
            placeholder="平台店铺指标名称"
          />
        </a-form-item>
        <a-form-item :colon="false">
          <a-input
            allowClear
            v-model:value="searchParams.value"
            placeholder="平台店铺指标编号"
          />
        </a-form-item>
      </a-form>
    </ComSearch>
  </ComHeader>
  <!-- 表格 -->
  <div class="container">
    <div class="ComTable">
      <ComTable
        :pagination="pagination"
        :columns="columns"
        :dataSource="dataSource"
        :tableLoading="tableLoading"
        @on-page="handlePage"
      >
        <template
          #[item.slots.customRender]="scope"
          v-for="item in columns"
          :key="item.dataIndex"
        >
          <template>
            {{ scope.scope.record[item.dataIndex] }}
          </template>
        </template>
      </ComTable>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance, ref, watch, computed } from 'vue'
import { formatApiParams } from '@/utils/util'
import { columns } from './js/index'
import {
  paginationInterFace,
  columnsItemInterFace,
  pageEventInterFace,
} from '@/interface/tableInterFace'
// 组件实例
const context = getCurrentInstance()?.appContext.config.globalProperties
let searchParams = ref({
  value: '',
})
// 表格数据
let dataSource = ref<Array<columnsItemInterFace>>([])
let tableLoading = ref(false)
// 分页数据
const pagination = ref<paginationInterFace>({
  total: 500,
  current: 1,
  pageSize: 20,
})

/**
 * 分页事件
 * @param pagesParams
 */
const handlePage = (pagesParams: pageEventInterFace) => {
  pagination.value.current = pagesParams.pageIndex
  pagination.value.pageSize = pagesParams.pageSize
  getPage(searchParams.value)
}

const handleSearch = () => {
  let params = formatApiParams(searchParams.value)
  getPage(params)
}
const handleReset = () => {
  searchParams.value = {} as any
  let params = formatApiParams(searchParams.value)
  getPage(params)
}

const getPage = async (params?: any) => {
  try {
    tableLoading.value = true
    let searchParams = {
      ...params,
      pageIndex: pagination.value.current,
      pageSize: pagination.value.pageSize,
    }
    return
    let { code, data } = await context.$API.adChannelAdChoosePage(searchParams)
    if (code == 0) {
      dataSource.value = data.list
      pagination.value.total = data.count
    }
    tableLoading.value = false
  } catch (error) {
    console.error('error', error)
  }
}
</script>

<style lang='less' scoped>
</style>