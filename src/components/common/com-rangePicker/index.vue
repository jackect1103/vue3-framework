<template>
  <a-range-picker
    allowClear
    style="width: 100%"
    v-model:value="datePicker"
    show-time
    :format="$props.format"
    @change="handleDatePicker"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Moment } from 'moment'
const $props = withDefaults(defineProps<{
  timeValue?: any
  format?: string
}>(), {
  timeValue: [],
  format: 'YYYY-MM-DD HH:mm',
})


const $emit = defineEmits(['on-change'])
let datePicker = ref<Moment[]>([])
watch(
  () => $props.timeValue,
  (timeValue) => {
    datePicker.value = timeValue
  },{
    deep:true,
    immediate:true
  }
)
const handleDatePicker = (time: any) => {
  let startDateTime = ''
  let endDateTime = ''
  if (time) {
    startDateTime = time[0].format($props.format)
    endDateTime = time[1].format($props.format)
  } else {
    startDateTime = ''
    endDateTime = ''
  }
  $emit('on-change', {
    startDateTime,
    endDateTime,
  })
}
</script>