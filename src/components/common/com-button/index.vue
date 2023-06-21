<!-- 
  v-bind="$props.infos" 统一绑定
  <a-button :type="$props.infos.type" :disabled="$props.infos.disabled" :loading="$props.infos.loading"> 
-->
<template>
  <div class="combtn">
    <!-- 设置权限 -->
    <a-button
      v-if="$props.permission"
      v-bind="$props"
      v-permission="$props.permission"
    >
      <slot name="icon-left"></slot>
      <slot></slot>
      <slot name="icon-right"></slot>
    </a-button>

    <!-- 不设置权限 -->
    <a-button v-else v-bind="$props">
      <slot name="icon-left"></slot>
      <slot></slot>
      <slot name="icon-right"></slot>
    </a-button>
  </div>
</template>

<script lang="ts" setup>
interface buttonInteFace {
  type?: string // 类型  	primary | ghost | dashed | link | text | default
  disabled?: boolean // 是否可用状态
  loading?: boolean // 是否加载
  permission?: string // 按钮权限路径
}
const $props = withDefaults(defineProps<buttonInteFace>(), {
  type: 'primary', // primary | ghost | dashed | link | text | default
  disabled: false, // true false
  loading: false, // true false
})
</script>

<style lang="less" scoped>
.combtn{
  display: inline;
}
</style>