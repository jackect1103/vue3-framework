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
      <template v-if="$props.btnType == 'delete'">
        <a-popconfirm
          title="是否删除当前数据?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="confirm"
          @cancel="cancel"
        >
          <slot name="icon-left"></slot>
          <slot></slot>
          <slot name="icon-right"></slot>
        </a-popconfirm>
      </template>
      <template v-else>
        <slot name="icon-left"></slot>
        <slot></slot>
        <slot name="icon-right"></slot>
      </template>
    </a-button>

    <!-- 不设置权限 -->
    <a-button v-else v-bind="$props">
      <template v-if="$props.btnType == 'delete'">
        <a-popconfirm
          title="是否删除当前数据?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="confirm"
          @cancel="cancel"
        >
          <slot name="icon-left"></slot>
          <slot></slot>
          <slot name="icon-right"></slot>
        </a-popconfirm>
      </template>
      <template v-else>
        <slot name="icon-left"></slot>
        <slot></slot>
        <slot name="icon-right"></slot>
      </template>
    </a-button>
  </div>
</template>

<script lang="ts" setup>
interface buttonInteFace {
  type?: string // 类型  	primary | ghost | dashed | link | text | default
  disabled?: boolean // 是否可用状态
  size?: string //设置按钮大小  large | middle | small
  btnType?: string // 按钮类型 default | delete
  danger?: boolean // 设置危险按钮
  loading?: boolean // 是否加载
  permission?: string // 按钮权限路径
}
const $props = withDefaults(defineProps<buttonInteFace>(), {
  type: 'primary', // primary | ghost | dashed | link | text | default
  size: 'small', // 设置按钮大小  large | middle | small
  btnType: 'default', // 按钮类型 default | delete
  danger: false, // true false
  disabled: false, // true false
  loading: false, // true false
  permission: 'false',
})

const $emit = defineEmits(['on-delete'])

const confirm = () => {
  $emit('on-delete')
}

const cancel = () => {}
</script>

<style lang="less" scoped>
.combtn {
  display: inline;
}
</style>