<template>
  <!-- 高级搜索 -->
  <div class="com-search" v-if="!$props.isNormal">
    <!-- 搜索 -->
    <div class="com-search-module">
      <!-- 简单搜索 -->
      <transition name="fade">
        <div v-show="btnFlag" class="simpleSearch">
          <slot name="simpleSearch"></slot>
        </div>
      </transition>

      <!-- 高级搜索 -->
      <transition name="fade">
        <div v-show="!btnFlag" class="advancedSearch">
          <slot name="advancedSearch"></slot>
        </div>
      </transition>
    </div>
    <!-- 按钮 -->
    <div class="com-search-btn">
      <div class="btn_wrapper">
        <div class="btnleft">
          <slot name="btnleft"></slot>
        </div>
        <div class="search-btn">
          <a-button class="btn-style" type="primary" @click="searchEvent"
            >查询</a-button
          >
          <a-button class="btn-style" @click="resetEvent">重置</a-button>
          <template v-if="!$props.isNormal">
            <a-button class="btn-style" type="link" @click="receiveFair">
              {{ btnReceiveFair }}
              <DownOutlined v-show="btnFlag" />
              <UpOutlined v-show="!btnFlag" />
            </a-button>
          </template>
        </div>
      </div>
    </div>
  </div>

  <!-- 普通搜索 -->
  <div class="com-isNormal" v-else>
    <slot></slot>
    <div class="com-search-btn">
      <div class="btn_wrapper">
        <div class="btnleft">
          <slot name="btnleft"></slot>
        </div>
        <div class="search-btn">
          <a-button class="btn-style" type="primary" @click="searchEvent"
            >查询</a-button
          >
          <a-button class="btn-style" @click="resetEvent">重置</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const $props = defineProps({
  isNormal: Boolean, //是否为普通搜索
})
const $emit = defineEmits(['handleSearch', 'handleReset'])
/* *****************************按钮收展*********************************** */
let btnFlag = ref(true)
let btnReceiveFair = ref('展开')
const receiveFair = () => {
  btnFlag.value = !btnFlag.value
  btnReceiveFair.value = btnFlag.value ? '展开' : '收起'
}
/* *****************************按钮收展*********************************** */
// 查询事件
const searchEvent = () => {
  $emit('handleSearch')
}
// 重置事件
const resetEvent = () => {
  $emit('handleReset')
}
</script>

<style lang="less" scoped>
.com-search {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 5px;

  &-module {
    display: flex;
    flex-direction: column;
  }

  &-btn {
    display: flex;
    justify-content: end;
    margin: 10px 0;

    .btn_wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      .search-btn {
        .btn-style {
          margin: 0 5px;
        }
      }
    }
  }
  .simpleSearch {
    width: 100%;
  }
  .advancedSearch {
    width: 100%;
  }
}
.com-isNormal {
  width: 100%;
  display: flex;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
  justify-content: flex-end;
  align-content: center;
  border-radius: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>