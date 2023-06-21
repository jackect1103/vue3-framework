<template>
  <result class="container" status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="goHome">Back Home</a-button>
    </template>
  </result>
</template>

<script lang="ts" setup>
import { Result } from 'ant-design-vue';
import {  useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.replace('/')
}
</script>

<style lang="less" scoped>
.container {
  height: calc(70vh);
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>