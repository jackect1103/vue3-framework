<!-- 
  左右折叠面板
 -->
<template>
  <div class="container">
    <!-- 左侧面板 -->
    <transition name="fade">
      <div  :class="['leftPanel',picIcon ? 'leftPanel200' : 'leftPanel50']">
        <div class="left-split-header">
          <h3 v-show="leftShow">批量搜索</h3>
          <PicLeftOutlined @click="taggleIcon" v-show="picIcon"  class="picIcon"/>
          <PicRightOutlined @click="taggleIcon" v-show="!picIcon"  class="picIcon"/>
        </div>
        <block v-show="leftShow">
            <slot name="leftPanel"></slot>
        </block>
      </div>
    </transition>

    <!-- 右侧面板 -->
    <transition name="fade">
      <div :class="[picIcon ? 'rightPanel200' : 'rightPanel50']">
        <slot name="rightPanel"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 展示taggleIcon按钮
let picIcon = ref(true);
let picLeftW = ref(200) // 左侧折叠面板宽度
let picRightW = ref('calc(100% - picLeftW)') // 右侧折叠面板宽度
let leftShow = ref(true)

// 切换picIcon
const taggleIcon = () => {
    picIcon.value = !picIcon.value
    if (picIcon.value) {
        picLeftW.value = 200
        picRightW.value = `calc(100% - ${picLeftW.value}px)`
        leftShow.value = picIcon.value
    } else {
        picLeftW.value = 50
        picRightW.value = `calc(100% - ${picLeftW.value}px)`
        leftShow.value = picIcon.value
    }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  .leftPanel{
    border-right:1px solid #ccc;
    margin-right: 10px;
      .left-split-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 40px;
        padding: 0 16px;
        margin-top: 4px;
        margin-right: 4px;
        border-bottom:1px solid #ccc;
      }
  }

  .leftPanel200{
    width: 200px;
  }
  .leftPanel50{
    width: 50px;
  }

  .rightPanel200{
    width: calc(100% - 200px);
  }

  .rightPanel50{
    width: calc(100% - 50px);
  }
}

.picIcon{
    font-size: 18px;
    cursor: pointer;
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