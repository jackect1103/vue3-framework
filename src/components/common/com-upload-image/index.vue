<template>
  <div>
    <div class="image">
      <div v-for="(item, index) in files" :key="index" class="item">
        <a-image :width="100" :src="item.fileUrl" />
      </div>
      <!-- 上传图片 -->
      <a-upload
        v-model:file-list="fileList"
        list-type="picture-card"
        :before-upload="beforeUpload"
        @preview="handlePreview"
      >
        <div v-if="fileList.length < 8">
          <plus-outlined />
          <div style="margin-top: 8px">上传图片</div>
        </div>
      </a-upload>
    </div>
    <!-- 图片放大 -->
    <!-- <a-modal
      :visible="previewVisible"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal> -->
  </div>
</template>
<script setup lang='ts'>
import { getCurrentInstance, ref, watch, computed } from 'vue'
import type { UploadProps } from 'ant-design-vue'
// 组件实例
const context = getCurrentInstance()?.appContext.config.globalProperties
const $emit = defineEmits('on-upload')
const $props = withDefaults(
  defineProps<{
    files?: any
  }>(),
  {
    files: [],
  }
)
const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')

let files = ref([])
let fileList = ref([])
watch(() => $props.files,(filesVal) => {
  fileList.value = []
  files.value = filesVal
})

const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}

/**
 * 上传文件之前的钩子
 * @param
 */
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [...fileList.value, file]
  handleUpload(file)
  return false
}

/**
 * 调用上传文件接口
 * @param file
 */
const handleUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file as any)

  // TODO:调用上传文件接口
  let { code, data } = await context.$API.uploadFile(formData)
  if (code == 0) {
    context.$message.success('上传文件成功')
    $emit('on-upload', data)
  } else {
    fileList.value.pop()
    context.$message.error('上传文件失败')
  }
}

/**
 * 点击文件链接或预览图标时的回调
 * @param   file
 */
const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string
  }
  previewImage.value = file.url || file.preview
  previewVisible.value = true
  previewTitle.value =
    file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
}

/**
 * 格式化Base64
 * @param file
 */
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
</script>
<style lang='less' scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-upload-picture-card-wrapper {
  width: auto !important;
}

.image {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 5px;
  }
}
</style>