<template>
  <footer>
    <p class="footer">
      <span>帮助</span>
      <span>隐私</span>
      <span>条款</span>
    </p>
    <p class="copyright">copyright @ 2010-2021 Fandow.All Right Reserved</p>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style lang="less" scoped>
footer{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
    .footer {
      display: flex;
      width: 250px;
      justify-content: space-between;
    }
    .copyright {
      width: 500px;
      text-align: center;
    }
}
</style>