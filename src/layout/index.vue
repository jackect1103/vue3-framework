<script setup lang="ts" name="LayoutIndex">
import LayoutHeader from './components/Header/index.vue'
import LayoutSider from './components/Sider/index.vue'
import LayoutContent from './components/Content/index.vue'
import useCommon from '@/hooks/useCommon.ts'
useCommon()
</script>

<template>
  <ALayout class="layout-container">
    <LayoutHeader />
    <ALayout>
      <LayoutSider />
      <LayoutContent />
    </ALayout>
  </ALayout>
</template>

<style scoped>
.site-layout-background {
  background: #fff;
}

.ant-menu {
  border-right: none;
}

.ant-menu-sub.ant-menu-inline {
  background-color: #fff;
}

.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: unset !important;
}

.ant-menu-sub.ant-menu-inline {
  background-color: #fff !important;
}
</style>

<style lang="less" scoped>
.layout-container {
  background-color: #f0f2f5;
  display: flex;
  height: 100vh;
  overflow: hidden;
  .ant-layout {
    overflow: hidden;
  }
  .layout-content {
    flex: none;
  }
}
</style>
