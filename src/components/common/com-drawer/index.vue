<template>
  <a-drawer
    :width="850"
    :title="$props.title"
    placement="right"
    v-model:visible="drawerVisible"
    :footerStyle="footerStyle"
    @close="handleBtn('close')"
  >
    <template #footer>
      <a-button style="margin-right: 8px" @click="handleBtn('close')">取消</a-button>
      <a-button v-if="$props.submit" type="primary" @click="handleBtn('submit')">确定</a-button>
    </template>
    <div class="wrapper">
        <slot></slot>
    </div>
  </a-drawer>
</template>

<script setup lang='ts'>
import { getCurrentInstance, ref, watch, computed } from 'vue'
const $emit = defineEmits(['update:visible'])
const $props = withDefaults(defineProps<{
    title:string,
    visible:boolean,
    submit:boolean,
}>(),{
    title:'抽屉',
    visible:false,
    submit:false,
})
const footerStyle = ref({
    display:'flex',
    justifyContent:'flex-end',
})

let drawerVisible = ref(false)
watch(() => $props.visible,(visible)=>{
    console.log('visible', visible)
    drawerVisible.value = visible
},{
    immediate:true
})

const handleBtn = (type:string) => {
    $emit('update:visible')
}
</script>

<style lang='less' scoped>
.wrapper{
    padding: 5px;
    box-sizing: border-box;
}

</style>