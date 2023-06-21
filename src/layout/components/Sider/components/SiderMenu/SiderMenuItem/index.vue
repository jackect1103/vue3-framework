<script setup lang="ts" name="SiderMenuItem">
import { computed } from 'vue'
// import SiderMenuItem from '@/layout/components/Sider/components/SiderMenu/SiderMenuItem/index.vue'
import type { RouteRecordRaw } from 'vue-router'

interface Props {
  routes: RouteRecordRaw
}

const props = withDefaults(defineProps<Props>(), {
  // TODO 这里一定要实现这几个默认参数，详细 ---> vue-router.d.ts
  routes: () => ({
    path: '',
    name: '',
    meta: { title: '' },
    children: []
  })
})

/**
 * 判断是否是递归菜单
 */
const isTree = computed(() => {
  return (
    props.routes?.meta?.type === 0 ||
    (!Object.is(props.routes?.meta?.hideChildrenInMenu, true) && !!props.routes?.children?.length)
  )
})

/**
 * 子菜单
 */
const childrenMenu = computed(() => {
  return [...(props.routes.children || [])].filter((n) => !n?.meta?.hideInMenu)
})
</script>

<template>
  <template v-if="isTree">
    <ASubMenu :key="routes.name ?? routes.path" v-bind="$attrs">
      <template #title>
        <span>
          <component :is="routes?.meta?.icon" />
          <span>{{ routes?.meta?.title }}</span>
        </span>
      </template>
      <!--            递归组件生成子菜单-->
      <template v-for="sub in childrenMenu" :key="sub.name ?? sub.path">
        <SiderMenuItem :routes="sub" v-if="!sub.hidden" />
      </template>
    </ASubMenu>
  </template>
  <template v-else>
    <AMenuItem :key="routes.name">
      <component :is="routes?.meta?.icon" />
      <span>{{ routes?.meta?.title }}</span>
    </AMenuItem>
  </template>
</template>

<style scoped lang="less"></style>
