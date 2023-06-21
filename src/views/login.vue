<template>
  <div class="login" @keydown.enter="onSubmit">
    <div class="login-con">
      <a-card>
        <div class="header">
          <img src="@/assets/image/logo_fandow.png" style="width: 160px" />
        </div>
        <div class="welcome">
          <span>欢迎登陆数据采集中心系统</span>
        </div>
        <div class="form-con">
          <a-form>
            <!-- 工号 -->
            <a-form-item v-bind="validateInfos.username">
              <a-input v-model:value="form.username" placeholder="Username">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <!-- 密码 -->
            <a-form-item v-bind="validateInfos.password">
              <a-input-password
                v-model:value="form.password"
                placeholder="Password"
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <!-- 验证码 -->
            <a-form-item
              v-bind="validateInfos.captcha"
              style="display: flex"
              v-if="showCaptcha"
            >
              <a-input v-model:value="form.captcha" placeholder="验证码" />
              <a-button
                type="primary"
                :disabled="!canGetCaptcha"
                @click.prevent="getCaptcha"
                >获取验证码
              </a-button>
            </a-form-item>

            <!-- 按钮 -->
            <a-form-item>
              <a-button
                type="primary"
                :loading="loading"
                block
                @click.prevent="onSubmit"
                >登录</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </a-card>
      <div class="swiper">
        <a-carousel arrows autoplay>
          <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
              <left-circle-outlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
              <right-circle-outlined />
            </div>
          </template>
          <div>
            <img src="@/assets/image/login_swiper_01.jpg" />
          </div>
          <div>
            <img src="@/assets/image/login_swiper_02.jpg" />
          </div>
          <div>
            <img src="@/assets/image/login_swiper_03.jpg" />
          </div>
        </a-carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
// 组件实例
const context = getCurrentInstance()?.appContext.config.globalProperties
interface FormData {
  username: string
  password: string
  captcha?: string // 验证码
  client_id: string // 应用ID
  client_secret: string // 应用Secret
  grant_type: string // 授予类型
}
const $router = useRouter()
const useForm = Form.useForm
// 表单数据
const form = reactive<FormData>({
  username: '',
  password: '',
  captcha: '',
  client_id: 'af9fc0a207c018fb244e8d3b5c7d815c', // 应用ID
  client_secret: '1cfdb85d6ca1595dfa72fee59e7e9c67', // 应用Secret
  grant_type: 'password',
})
// 登录按钮加载状态
let loading = ref<Boolean>(false)
// 是否显示验证码框
let showCaptcha = ref<Boolean>(false)
// 能否按验证码按钮
let canGetCaptcha = ref<Boolean>(true)
// 表单数据校验
const { validate, validateInfos } = useForm(
  form,
  reactive({
    username: [{ required: true, message: '请输入用户' }],
    password: [{ required: true, message: '请输入密码' }],
    captcha: [{ message: '请输入验证码', trigger: 'blur' }],
  })
)
// 登录时
const onSubmit = () => {
  validate()
    .then(async (aaa) => {
      loading.value = true
      const res = await context.$API.loginApi(form)
      if (!res.code) {
        if (res.access_token) {
          localStorage.setItem('token', res.access_token as string)
          Cookies.set('oa-authorization',res.access_token)
          message.success('登录成功')
          $router.replace({ path: '/' })
          loading.value = false
        } else {
          message.error(res.message)
          loading.value = false
        }
      }
    })
    .catch((err) => {
      console.error('登录失败', err)
    })
}
// 验证码循环
let timer: any
// 获取验证码
const getCaptcha = async () => {
  canGetCaptcha.value = false
  let firstTime = Date.now()
  timer = setInterval(() => {
    let diff = Date.now() - firstTime
    if (diff >= 300000) {
      // 验证码5分钟失效
      canGetCaptcha.value = true
      clearInterval(timer)
    }
  }, 1000)
  const res = await context.$API.getCaptcha({ username: form.username })
  if (res.code !== 0) {
    canGetCaptcha.value = true
    message.warning('获取验证码失败')
  } else {
    message.success(res.msg)
  }
}
</script>


<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  min-height: 470px;
  background: #33aaee url('@/assets/image/login_bg.jpg') no-repeat;
  background-size: 100% 100%;
  position: absolute;

  &-con {
    position: absolute;
    height: 470px;
    left: 50%;
    transform: translate(-50%, 0);
    top: 50%;
    margin-top: -235px;
    overflow: hidden;
    display: flex;

    .header,
    .welcome,
    .form-con {
      margin: 50px 20px;
      text-align: center;

      :deep(.ant-form-item-control-input-content) {
        display: flex;
      }
    }

    .welcome {
      width: 210px;
      font-size: 18px;
    }

    .header {
      margin-top: 20px;
    }

    .swiper {
      width: 510px;
      margin-left: 5px;

      img {
        width: 510px;
      }

      .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
        width: 25px;
        font-size: 25px;
        color: #fff;
        opacity: 0.3;
      }

      .ant-carousel :deep(.custom-slick-arrow:before) {
        display: none;
      }
    }
  }
}
</style>
