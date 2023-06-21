<script setup lang="ts" name="App">
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'

</script>

<template>
  <ConfigProvider :locale="zh_CN">
    <RouterView />
  </ConfigProvider>
</template>

<style scoped lang="less">
/* 修改滚动条样式 */
.box-card::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.box-card::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e5e5e5;
}
.box-card::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}
/deep/ .ant-modal-header{
  border-radius: 10px !important;
}
/deep/ .ant-modal-content{
  border-radius: 10px!important;
}
</style>
