import { ref, watch } from 'vue'
import type { CascaderProps } from 'ant-design-vue'
type strOrNum = string | number
interface cascader {
    allFlag?: boolean //是否需要全选
    options: CascaderProps['options'] // 下拉数据
    modelValue: string[] // 可以传递反显数据
    placeholder?: strOrNum // 提示词
    multiple?: boolean // 是否多选
    [propName: string]: any
}



/**
 * 选择完成后的回调
 * @param e 
 * @param selectedOptions 
 */
const handleChange = (e: any, selectedOptions: any) => {
    return {
        value: selectedOptions ? selectedOptions[selectedOptions.length - 1].value : undefined,
        label: selectedOptions ? selectedOptions[selectedOptions.length - 1].label : undefined,
    }
}

/**
 * 添加全选选项
 * @param options 
 */
const addAllOptions = (options: CascaderProps['options']) => {
    let list = [{ value: 'all', label: '全选' }] as CascaderProps['options']
    options?.map(e => {
        if (e.children) e.children = addAllOptions(e.children)
        list?.push(e)
    })
    return list
}
const useCascader = ($props: cascader) => {
    let cascaderVal = ref<string[]>([])
    let cascaderOptions = ref<CascaderProps['options']>([])
    watch([() => $props.options, () => $props.modelValue], ([optionsVal, modelValue]) => {
        cascaderOptions.value = optionsVal
        console.log('optionsVal',$props, optionsVal)
        modelValue && (cascaderVal.value = [...modelValue])
    }, {
        deep:true,
        immediate: true
    })
    // $props.allFlag && (cascaderOptions = addAllOptions(cascaderOptions))

    return {
        cascaderVal,
        cascaderOptions,
        handleChange,
    }
}
export default useCascader