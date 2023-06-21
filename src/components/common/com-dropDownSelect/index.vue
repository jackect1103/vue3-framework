<!-- 
  下拉框
 -->
<template>
  <a-select
    ref="select"
    allowClear
    v-model:value="keyWord"
    :mode="$props.mode"
    :placeholder="$props.placeholder"
    :disabled="$props.disabled"
    :style="selectW"
    @change="handleChange"
    @popupScroll="handleScroll"
  >
    <a-select-option
      :value="item.value"
      v-for="item in options"
      :key="item.id"
      >{{ item.label }}</a-select-option
    >
  </a-select>
</template>

<script setup lang="ts">
import { ref, watch, computed, getCurrentInstance } from 'vue'
const instance = getCurrentInstance()?.appContext.config.globalProperties
type strOrNum = string | number
interface options {
  id: strOrNum
  value?: strOrNum
  label: strOrNum
  mode?: strOrNum
  [propName: string]: any // 定义允许有任意属性
}
const $props = withDefaults(
  defineProps<{
    placeholder?: strOrNum
    width?: strOrNum
    mode?: strOrNum
    disabled?: boolean
    options: Array<options>
  }>(),
  {
    placeholder: '请选择',
    width: '200',
    disabled: false,
    mode: 'combobox', // ('multiple' | 'tags' 多选) | 'combobox' 单选
  }
)
const $emit = defineEmits(['on-change', 'on-scroll'])
let options = ref($props.options)
let keyWord = ref<string>($props.value)

watch(
  () => $props.options,
  (value) => {
    options.value = value
  },
  {
    deep: true,
    immediate: true,
  }
)
const selectW = computed(() => {
  let flag =
    String($props.width).includes('%') || String($props.width).includes('%px')
  return flag ? `width:${$props.width}` : `width:${$props.width}px`
})

/**
 * 选中 option，或 input 的 value 变化
 * @param e
 */
const handleChange = (e: strOrNum) => {
  $emit('on-change', e)
}

/**
 * 下拉列表滚动时的回调
 * @param e
 */
function handleScroll(e: any) {
  const { target } = e
  // target.scrollTop + target.offsetHeight === target.scrollHeight  判断是否滑动到底部
  if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
    // 在这里调用接口
    $emit('on-scroll')
  }
}
// const scroll = () => {
//     console.log('instance', instance.$debounce)
//     instance.$debounce(handleScroll,500)
// }
</script>

<style lang="less">
</style>