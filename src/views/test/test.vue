<template>
  <ComSelect :options="selectOptions" mode="multiple" @on-change="handleChange"/>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
type strOrNum = string | number
interface options {
  id: strOrNum
  value: strOrNum
  label:strOrNum
  [propName:string]:any ,// 定义允许有任意属性
}
const selectOptions = ref<Array<options>>([])
const createOp = () => {
  let list = []
  for (let i = 0; i < 35; i++) {
    list.push({
      id: i,
      label: i,
      value: i,
      name: i,
    })
  }
  selectOptions.value = list
}
const handleChange = (e:strOrNum) => {
    console.log('e', e)
}
createOp()
</script>

<style lang="less">
</style>