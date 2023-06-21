<script setup lang="ts" name="LayoutHeader">
import { computed, ref } from 'vue'
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'
import { useSettingStore } from '@/store/module/setting'
import SiderLogo from './SiderLogo/index.vue'

const $router = useRouter()
const currRoute = useRoute()

const settingStore = useSettingStore()

const isSpreading = computed(() => settingStore.isSpreading)
const spreadingIconSize = computed(() => ({ fontSize: '18px' }))
const currRoutesMatched = computed(() => currRoute.matched)

const changeSpreading = () => {
  settingStore.changeIsSpreading()
}

const userInfo = {
  realName: '',
}

// 退出登录
const signOut = () => {
  const ENV = import.meta.env.MODE
  localStorage.clear()
  Cookies.remove('authorization', { domain: '.fandow.com' })
  Cookies.remove('authorization')
  Cookies.remove('oa-authorization', { domain: '.fandow.com' })
  Cookies.remove('oa-authorization')
  location.href =
    ENV == 'development'
      ? `${location.protocol}//${location.host}/login`
      : import.meta.env.VITE_LOGINURL
}
let actived = ref('home')
let routerList = [{
  id:0,
  name:'首页',
  value:'home'
},{
  id:1,
  name:'系统管理',
  value:'system'
},{
  id:2,
  name:'报表',
  value:'report'
}]
/**
 * 一级导航事件
 * @param type 
 */
const handleRouter = (type:string) => {
  actived.value = type
}
</script>

<template>
  <ALayoutHeader class="header">
    <div class="logo">
      <SiderLogo style="margin-right: 25px;"/>
      <!-- 左侧导航栏 -->
      <ASpace :size="20">
        <span @click="changeSpreading" class="spreading-icon">
          <MenuFoldOutlined v-show="!isSpreading" :style="spreadingIconSize" />
          <MenuUnfoldOutlined v-show="isSpreading" :style="spreadingIconSize" />
        </span>
      </ASpace>
    </div>

    <!-- 右侧头像-退出登录 -->
    <ASpace :size="20" align="center" class="avatar">
      <!-- 图标 -->
      <AAvatar style="background-color: #1890ff" :size="24">F</AAvatar>
      <!-- 姓名 -->
      <a-popover v-if="true" placement="bottom">
        <template #content>
          <div style="cursor: pointer; width: 60px" @click="signOut">
            退出登录
          </div>
        </template>
        <span style="color: #93c4f7">cscs{{ userInfo.realName }}</span>
      </a-popover>
      <span v-else>项目小助手</span>
    </ASpace>
  </ALayoutHeader>
</template>

<style scoped lang="less">
.header {
  padding: 0 20px;
  height: 64px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 199;
  transition: width 0.28s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px 5px rgba(12, 30, 57, 0.1);
  .logo{
    display: flex;
  }

  .ant-breadcrumb {
    margin: 0 !important;
  }

  * {
    cursor: pointer;
  }

  .avatar {
    margin-right: 20px;
    :deep(.ant-space-item) {
      line-height: normal;
    }
  }
}

.routerList {
  width: 100%;
  height: 100%;
  display: flex;
  .item {
    width: 130px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    &:hover {
      color: #2697ff;
    }

    .icon {
      color: #2697ff;
      font-size: 18px;
    }
    .font {
      margin-left: 5px;
    }
  }
  .actived {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #2697ff;
    }
  }
}
</style>
