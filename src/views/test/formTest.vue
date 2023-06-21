<!--antd.pro中使用Modal嵌套Form实现表单的验证及表单项的值获取
   https://blog.csdn.net/chenqk_123/article/details/107781437 -->
<template>
  <a-form
    :model="formState"
    v-bind="layout"
    :rules="rules"
    @finish="onFinish"
  >
    <a-form-item name="name" label="Name">
      <ComSelect
        v-model:value="formState.name"
        :options="selectOptions"
        mode="multiple"
      />
    </a-form-item>

    <a-form-item name="age" label="自定义校验规则">
      <ComSelect
        v-model:value="formState.age"
        :options="selectOptions"
        mode="combobox"
        placeholder="placeholder"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { ref, reactive } from 'vue'
type strOrNum = string | number
interface options {
  id: strOrNum
  value: strOrNum
  label: strOrNum
  [propName: string]: any // 定义允许有任意属性
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
// 解决办法：placeholder不显示是因为设置了value值为"或者null，把value值设为undefined就可以了
const formState = ref({
  name: [],
    age: undefined,
})
let checkAge = async (_rule: Rule, value: string) => {
  if (typeof(value) == 'undefined') {
    return Promise.reject('Please input the age')
  } else {
    return Promise.resolve()
  }
}
const rules: Record<string, Rule[]> = {
  name: [{ required: true, trigger: 'change', message: '请选择!' }],
  age: [{ required: true, trigger: 'change', validator: checkAge }],
}


const selectOptions = ref<Array<options>>([])
const createOp = () => {
  let list = []
  for (let i = 0; i < 5; i++) {
    list.push({
      id: i,
      label: i,
      value: i,
      name: i,
    })
  }
  selectOptions.value = list
}
createOp()

const onFinish = (values: any) => {
  console.log('Success:', values)
}
</script>

<style lang="less">
</style>