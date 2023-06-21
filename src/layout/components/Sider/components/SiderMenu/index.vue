<script setup lang="ts" name="SiderMenu">
import { ref,computed,watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiderMenuItem from './SiderMenuItem/index.vue'
import { useSettingStore } from '@/store/module/setting'
import useSiderMenu from '@/hooks/useSiderMenu'
useSiderMenu()
const router = useRouter()
const currRoute = useRoute()
const settingStore = useSettingStore()
const isSpreading = computed(() => settingStore.isSpreading)
let fullRoutes = computed(() => settingStore.fullRoutes)
const openKeys = computed(() => settingStore.openKeys)
const selectedKeys = computed(() => settingStore.selectedKeys)
/**
 * 左侧菜单栏点击事件
 * @param param0
 * @returns
 */
const handleTapMenuItem = ({ key }: any) => {
  if (key === currRoute.name) return
  ;/http(s)?:/.test(key) ? window.open(key) : router.push({ name: key })
}
</script>

<template>
  <div class="menu-container" v-if="fullRoutes.length != 0">
    <AMenu
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      collapsible
      :collapsed="isSpreading"
      @click="handleTapMenuItem"
    >
      <template
        v-for="(item, index) in fullRoutes[0].children"
        :key="item.name ?? item.path ?? index"
      >
        <SiderMenuItem  :routes="item" />
      </template>
    </AMenu>
  </div>
  <div v-else class="empty">当前用户暂无菜单</div>
</template>

<style scoped lang="less">
.menu-container {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 64px);
  // box-shadow: 0 0 5px 1px rgba(12, 30, 57, 0.1);

  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
}

.empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
