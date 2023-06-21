<template>
  <a-modal
    :maskClosable="false"
    :width="$props.width"
    v-model:visible="modalVisible"
    :title="$props.title"
  >
    <div class="modal_content">
      <slot></slot>
    </div>
    <!-- 页脚 -->
    <template #footer>
      <a-button @click="handleReset">取消</a-button>
      <a-button type="primary" :loading="btnLoading" @click="handleSubmit"
        >提交</a-button
      >
    </template>
  </a-modal>
</template>

<script setup lang='ts'>
import {  ref, watch} from 'vue'

const $props = withDefaults(
  defineProps<{
    visible: boolean
    loading: boolean
    title: string
    width: string | number
  }>(),
  {
    visible: false,
    loading: false,
    title: '弹出窗标题',
    width: '600',
  }
)
const $emit = defineEmits(['on-reset', 'on-submit'])
let modalVisible = ref(false)
let btnLoading = ref(false)
watch([() => $props.visible, () => $props.loading], ([visible, loading]) => {
  modalVisible.value = visible
  btnLoading.value = loading
})

const handleReset = () => {
  $emit('on-reset')
}
const handleSubmit = () => {
  $emit('on-submit')
}
</script>

<style lang='less' scoped>
.modal_content{
    padding:0 10px;
    box-sizing: border-box;
}
</style>