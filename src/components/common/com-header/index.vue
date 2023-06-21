<template>
  <div class="com-header" v-if="title">
    <span class="com-header-title">{{ title }}</span>
    <span class="com-header-functional">
        <slot name="functional"></slot>
    </span>
  </div>
  <div class="com-header" v-else>
    <slot ></slot>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  title: String,
})

</script>

<style lang="less">
.com-header {
  width: 100%;
  min-height: 80px;
  background-color: #fff;
  display: flex;
  align-items: center;
  &-title {
    margin-left: 20px;
    font-size: 16px;
    font-weight: bolder;
  }
  &-functional {
    margin-left: 10px;
    color: #2222ff;
    cursor: pointer;
    font-size: 16px;
  }
}
</style>