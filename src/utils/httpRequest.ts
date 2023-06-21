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
import { ResultData } from '@/interface/Requset' 
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
  baseURL: import.meta.env.VITE_CLOUD_BASE_URL
  // timeout: 5000
  // 跨域时候允许携带凭证
  // withCredentials: true
}

/**
 * 设置不同的接口前缀
 * @param type 
 */
const setUpADifferentInterfacePrefix = (config: R) => {
  let { baseURL, url } = config
  let noNeedPrefix = ['/authentication/password-grant', '/authentication/captcha', '/auth/userinfo']
  let prefix = '/guide-sale/fandow/decal/admin';

  if (url === "/auth/get-all-route") { // 权限
    return baseURL += "/guide-sale/fandow/decal"
  } else if (noNeedPrefix.includes(url as string)) { // 登录 、验证码
    return import.meta.env.VITE_API_BASE_URL
  } else {
    return baseURL + prefix
  }
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
        config.baseURL = setUpADifferentInterfacePrefix(config)
        return {
          ...config,
          headers: {
            'Authorization': Cookies.get('oa-authorization') || '',
            'content-type': config.contentType ? config.contentType : 'application/json'
          }
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
        if (!whiteList.includes(res.status)) {
          message.error(throwErr(res.status, res.config.url!))
        } else {
          return res
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

  public getAction<T>(url: string, params?: object, reqConfig?: R): Promise<T> {
    return new Promise<T>((resolve) => {
      this.service({
        url,
        method: 'GET',
        params,
        ...reqConfig
      }).then((res) => {
        // @ts-ignore
        resolve(res.data)
      })
    })
  }

  public deleteAction<T>(url: string, data?: object, reqConfig?: R): Promise<T> {
    return new Promise<T>((resolve) => {
      this.service({
        url,
        method: 'DELETE',
        data,
        ...reqConfig
      }).then((res) => {
        const result: ResultData<T> = res.data
        // @ts-ignore
        resolve(result.data)
      })
    })
  }

  public postAction<T>(url: string, data?: object, reqConfig?: R): Promise<T> {
    return new Promise<T>((resolve) => {
      this.service({
        url,
        method: 'POST',
        data,
        ...reqConfig
      }).then((res) => {
        const result: ResultData<T> = res.data
        resolve(result as T)
      })
    })
  }

  public putAction<T>(url: string, data?: object, reqConfig?: R): Promise<T> {
    return new Promise<T>((resolve) => {
      this.service({
        url,
        method: 'PUT',
        data,
        ...reqConfig
      }).then((res) => {
        const result: ResultData<T> = res.data
        // @ts-ignore
        resolve(result.data)
      })
    })
  }
}

const request = new Http()
export default request
