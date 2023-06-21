<!-- 
    级联组件
 -->
 <template>
  <a-cascader
    allowClear
    v-model:value="cascaderVal"
    :style="{ cascaderW }"
    :multiple="$props.multiple"
    :placeholder="$props.placeholder"
    :options="cascaderOptions"
    @change="cascaderChange"
  ></a-cascader>
</template>

<script setup lang="ts" >
import { computed } from 'vue'
import type { CascaderProps } from 'ant-design-vue' 
import useCascader from './useCascader.ts'
type strOrNum = string | number
interface cascader {
  allFlag?: boolean //是否需要全选
  options: CascaderProps['options'] // 下拉数据
  modelValue?: string[] // 可以传递反显数据
  placeholder?: strOrNum // 提示词
  multiple?: boolean // 是否多选
  [propName: string]: any
}
const $emit = defineEmits(['on-change', 'update:modelValue'])
const $props = withDefaults(defineProps<cascader>(), {
  width: '150px',
  placeholder: '请选择',
  multiple: true,
})
const { cascaderVal,cascaderOptions, handleChange } = useCascader($props)

const cascaderW = computed(() => {
  return { width: $props.width }
})
/**
 * 级联事件
 * @param e 
 * @param selectedOptions 
 */
const cascaderChange = (e: any,selectedOptions:any) => {
  let params = handleChange(e,selectedOptions)
  $emit("on-change",{e,params})
}
</script>


<style lang="less">
</style>