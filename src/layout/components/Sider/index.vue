<script setup lang="ts" name="LayoutSider">
import { computed } from 'vue'
import SiderMenu from './components/SiderMenu/index.vue'
import { useSettingStore } from '@/store/module/setting'
const settingStore = useSettingStore()
const isSpreading = computed(() => settingStore.isSpreading)
/**
 * 当前收起状态
 */
</script>

<template>
  <ALayoutSider
    theme="light"
    :class="[isSpreading ? 'sider80' : 'sider230']"
    v-model:collapsed="isSpreading"
    :trigger="null"
    collapsible
  >
    <SiderMenu/>
  </ALayoutSider>
</template>

<style scoped lang="less">
.sider230 {
  width: 230px !important;
  max-width: 230px!important;
  min-width: 230px!important;
  flex: 0 0 230px!important;
}

.sider80 {
  width: 80px !important;
  max-width: 80px!important;
  min-width: 80px!important;
  flex: 0 0 80px!important;
}
</style>
