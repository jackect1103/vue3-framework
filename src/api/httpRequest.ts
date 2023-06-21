/**
 * @name: httpRequest
 * @author: 黄俊炎
 * @date: 2022-08-09 17:20
 * @description：httpRequest
 * @update: 2022-08-09 17:20
 */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import throwErr, { whiteList } from '@/utils/throwErr'
import Cookies from 'js-cookie'

/**
 * 额外配置
 */
interface ExtraConfig {
  /** 请求头type */
  contentType?: string
}

type R = AxiosRequestConfig & ExtraConfig

const requestConfig: R = {
  baseURL: import.meta.env.VITE_CLOUD_BASE_URL,
  timeout: 5000,
  mode: import.meta.env
  // 跨域时候允许携带凭证
  // withCredentials: true
}

interface requestParams {
  baseURL?: string,url: string, params?: object,data?: object, reqConfig?: R
}

class Http {
  private readonly service: AxiosInstance
  constructor() {
    this.service = axios.create(requestConfig)
    this.interceptors()
  }

  /**
   * 拦截器
   * @private
   */
  private interceptors() {
    /**
     * 请求拦截器
     */
    this.service.interceptors.request.use(
      (config: R) => {
        return {
          ...config,
          headers: {
            'authorization': Cookies.get('oa-authorization') || '',
            'content-type': config.contentType ? config.contentType : 'application/json'
          },
        }
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    )

    /**
     * 响应拦截器
     */
    this.service.interceptors.response.use(
      (res: AxiosResponse) => {
        const ENV = import.meta.env.MODE
        // 登录请求
        if (res.config.url == '/authentication/password-grant') {
          return res
        }
        if (res.data.code == 41005 || res.data.code == 41006) {
          message.error('登陆失效，请重新登录')
          Cookies.remove("authorization", { domain: '.fandow.com' });
          Cookies.remove("authorization");
          Cookies.remove("oa-authorization", { domain: ".fandow.com" });
          Cookies.remove("oa-authorization");
          setTimeout(() => {
            location.href = ENV == 'development' ? `${location.protocol}//${location.host}/login` : import.meta.env.VITE_LOGINURL
          }, 1000)
          return

        }
        if (res.data.code !== 0 && res.data.code !== 200) {
          message.error(res.data.msg || '出错啦')
          return Promise.reject(res.data)
        }
        return res
      },
      (error: AxiosError) => {
        const { response } = error
        if (!whiteList.includes(response?.status as number)) {
          message.error(throwErr(response?.status as number, response?.config.url as string))
        }
        if (!window.navigator.onLine) {
          message.error('网络连接失败')
        }
      }
    )
  }

  public getAction<T>(options:requestParams): Promise<T> {
    let {baseURL,url,params,reqConfig} =  options
    return new Promise<T>((resolve) => {
      this.service({
        baseURL,
        url,
        method: 'GET',
        params,
        ...reqConfig
      }).then((res) => {
        // @ts-ignore
        res && resolve(res.data)
      })
    })
  }

  public deleteAction<T>(options:requestParams): Promise<T> {
    let {baseURL,url,data,reqConfig} =  options
    return new Promise<T>((resolve) => {
      this.service({
        baseURL,
        url,
        method: 'DELETE',
        data,
        ...reqConfig
      }).then((res) => {
        // @ts-ignore
        res && resolve(res.data)
      })
    })
  }

  public postAction<T>(options:requestParams): Promise<T> {
    let {baseURL,url,data,reqConfig} =  options
    return new Promise<T>((resolve) => {
      this.service({
        baseURL,
        url,
        method: 'POST',
        data,
        ...reqConfig
      }).then((res) => {
        // @ts-ignore
        res && resolve(res.data)
      })
    })
  }

  public putAction<T>(options:requestParams): Promise<T> {
    let {baseURL,url,data,reqConfig} =  options
    return new Promise<T>((resolve) => {
      this.service({
        baseURL,
        url,
        method: 'PUT',
        data,
        ...reqConfig
      }).then((res) => {
        // @ts-ignore
        res && resolve(res.data)
      })
    })
  }
}

const request = new Http()
export default request
