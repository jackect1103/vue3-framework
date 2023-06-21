<script setup lang="ts" name="LayoutContent">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '@/store/module/setting'
const settingStore = useSettingStore()
const excludeKeepAlive = computed(() => settingStore.excludeKeepAlive)
const route = useRoute()
const getRoute = computed(() => route.fullPath)
</script>

<template>
  <ALayoutContent class="content-container">
    <div class="content-wrap">
      <router-view v-slot="{ Component }">
        <!-- Transition中的组件不能呈现动画的非元素根节点。 也就是说，Transition包裹的必须是一个单根的组件。 -->
        <!-- <transition mode="out-in" name="fade-transform"> -->
        <!-- </transition> -->
        <!--  :exclude="excludeKeepAlive" -->
        <keep-alive>
          <component :is="Component" :key="getRoute" />
        </keep-alive>
      </router-view>
    </div>
  </ALayoutContent>
</template>

<style scoped lang="less">
.content-container {
  margin: 0;
  transition: all 0.3s;
  overflow: auto;

  .content-wrap {
    height: 100%;
    // overflow: scroll;
  }
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
