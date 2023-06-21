<script setup lang="ts" name="SiderLogo">
import { computed } from 'vue'
import { useSettingStore } from '@/store/module/setting'

const settingStore = useSettingStore()

const isSpreading = computed(() => settingStore.isSpreading)

const projectName = computed(() => settingStore.projectName)
</script>

<template>
  <div class="f_r_s side-logo">
    <div class="logo" />
    <Transition name="slide-fade-projectName">
      <span v-if="!isSpreading">{{ projectName }}</span>
    </Transition>
  </div>
</template>

<style scoped lang="less">
.side-logo {
  width: 100%;
  padding-left: 20px;
  font-weight: 650;
  font-style: normal;
  font-size: 18px;
  color: #0096fa;
  cursor: pointer;
  height: 64px;
  line-height: 64px;

  .logo {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    background-image: url('@/assets/image/logo.png');
    background-size: auto 100%;
    background-repeat: no-repeat;
  }
}

.slide-fade-projectName-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-projectName-enter-from,
.slide-fade-projectName-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
