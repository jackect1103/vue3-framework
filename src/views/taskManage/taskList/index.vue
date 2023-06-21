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
          <a-range-picker v-model:value="searchParams.time" show-time />
        </a-form-item>
        <a-form-item :colon="false">
          <a-input allowClear v-model:value="searchParams.value" placeholder="文件编号" />
        </a-form-item>
        <a-form-item :colon="false" >
          <a-input allowClear v-model:value="searchParams.value" placeholder="任务id" />
        </a-form-item>
      </a-form>
    </ComSearch>
  </ComHeader>
</template>

<script setup lang='ts'>
import { getCurrentInstance, ref, watch, computed } from 'vue'
import { formatApiParams } from '@/utils/util'
// 组件实例
const context = getCurrentInstance()?.appContext.config.globalProperties
let searchParams = ref({
  value: '',
  time:'',
})

const handleSearch = () => {
  let params = formatApiParams(searchParams.value)
}
const handleReset = () => {
  searchParams.value = {} as any
  let params = formatApiParams(searchParams.value)
}
</script>

<style lang='less' scoped>
.searchCom {
  display: flex;
  align-items: center;
}
</style>