<template>
  <div class="app_main guide-container" style="height: 900px;">
    <!-- 自定义按钮 -->
    <div style="margin:10px 0">
      <ComButton></ComButton>&nbsp;
      <ComButton :infos="{ type: 'dashed', }">Dashed Button</ComButton>&nbsp;
      <ComButton :infos="{ type: 'primary', }">primary Button</ComButton>&nbsp;
      <ComButton :infos="{ type: 'text', }">text Button</ComButton>&nbsp;
      <ComButton :infos="{ type: 'link', }">link Button</ComButton>&nbsp;
      <ComButton :infos="{ type: 'Primary', disabled: true }">Primary(disabled)</ComButton>&nbsp;
      <ComButton :infos="{ type: 'Primary', loading: true }">loading Button</ComButton>&nbsp;
      <ComButton :infos="{ type: 'Primary' }">
        <template #icon-left>
          <SearchOutlined />
        </template>
        loading Button
        <template #icon-right>
          <DownloadOutlined  />
        </template>
      </ComButton>&nbsp;
    </div>

    <!-- 使用自定义table -->
    <ComTable :tableLoading="tableLoading" :pagination="pagination" :columns="columns" :dataSource="dataSource"
      @on-page="handlePage">
      <template #[item.slots.customRender]="scope" v-for="item in columns">
        <template v-if="item.dataIndex == 'operation'">
          <span style="color:red">操作</span>
        </template>
        <template v-else>{{ scope.scope.record[item.dataIndex] }}</template>
      </template>
    </ComTable>
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { columnsItemInterFace, searchParamsInterFace } from '@/interface/tableInterFace.ts';

// 表格数据
let dataSource = ref<Array<columnsItemInterFace>>([])
let tableLoading = ref(false)
// 列信息
let columns = [
  { title: 'Full Name', width: 120, dataIndex: 'name', key: 'name', fixed: 'left', slots: { customRender: 'name' } },
  { title: 'Age', width: 100, dataIndex: 'age', sorter: true, key: 'age', fixed: 'left', slots: { customRender: 'age' } },
  { title: 'Column 1', dataIndex: 'Column1', key: '1', width: 180, slots: { customRender: 'Column1' } },
  { title: 'Column 2', dataIndex: 'Column2', sorter: true, key: '2', width: 180, slots: { customRender: 'Column2' } },
  { title: 'Column 3', dataIndex: 'Column3', key: '3', width: 180, slots: { customRender: 'Column3' } },
  { title: 'Column 4', dataIndex: 'Column4', key: '4', width: 180, slots: { customRender: 'Column4' } },
  { title: 'Column 5', dataIndex: 'Column5', key: '5', width: 180, slots: { customRender: 'Column5' } },
  { title: 'Column 6', dataIndex: 'Column6', key: '6', width: 180, slots: { customRender: 'Column6' } },
  { title: 'Column 7', dataIndex: 'Column7', key: '7', width: 180, slots: { customRender: 'Column7' } },
  { title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'right', width: 150, slots: { customRender: 'operation' } },
]
// 分页数据
const pagination = ref({
  total: 500,
  current: 1,
  pageSize: 20,
})

/**
 * 分页事件
 * @param searchParams 
 */
const handlePage = (searchParams?: searchParamsInterFace) => {
  /**
   * To-Do
   * 调用接口
   */
  tableLoading.value = true
  let data: columnsItemInterFace[] = []
  let total = Math.ceil(Math.random() * 100)
  for (let index = 0; index < total; index++) {
    data.push({
      key: index,
      name: `胡彦斌--${index}`,
      age: Math.ceil(Math.random() * 25),
      Column1: `西湖区湖底公园${Math.ceil(Math.random() * 100)}号`,
      Column2: `西湖区湖底公园${Math.ceil(Math.random() * 100)}号`,
      Column3: `西湖区湖底公园${Math.ceil(Math.random() * 100)}号`,
      Column4: `西湖区湖底公园${Math.ceil(Math.random() * 100)}号`,
      Column5: `西湖区湖底公园${Math.ceil(Math.random() * 100)}号`,
      Column6: `西湖区湖底公园${Math.ceil(Math.random() * 100)}号`,
      Column7: `西湖区湖底公园${Math.ceil(Math.random() * 100)}号`,
    })
  }
  dataSource.value = data
  setInterval(() => {
    tableLoading.value = false
  }, 1500)

}
handlePage()
</script>

<style lang="less" scoped>

</style>