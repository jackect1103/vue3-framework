<template>
  <a-modal
    :maskClosable="false"
    :width="width"
    v-model:visible="modalVisible"
    :title="$props.title"
    @cancel="handleReset"
  >
    <div class="modal_content">
      <slot></slot>
    </div>
    <!-- 页脚 -->
    <template #footer>
      <a-button @click="handleReset">取消</a-button>
      <a-button v-if="$props.showSubmit" type="primary" :loading="btnLoading" @click="handleSubmit"
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
    showSubmit: boolean
    title: string
    width: string|number
  }>(),
  {
    visible: false,
    loading: false,
    showSubmit: true,
    title: '弹出窗标题',
    width: '600px',
  }
)
const $emit = defineEmits(['on-reset', 'on-submit'])
let modalVisible = ref(false)
let btnLoading = ref(false)
let width = ref<string|number>('600px')
watch([() => $props.visible, () => $props.loading, () => $props.width], ([visibleVal, loadingVal,widthVal]) => {
  modalVisible.value = visibleVal
  btnLoading.value = loadingVal
  width.value = widthVal
},{
  immediate:true,
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