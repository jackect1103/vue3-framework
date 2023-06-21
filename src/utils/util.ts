/**
 * @name: util
 * @author: 黄俊炎
 * @date: 2022-08-12 01:55
 * @description：util
 * @update: 2022-08-12 01:55
 */
 import Cookie from 'js-cookie'

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
    ? '上午好'
    : hour <= 13
    ? '中午好'
    : hour < 20
    ? '下午好'
    : '晚上好'
}

/**
 * 文本复制功能
 * @param text
 * @param fn
 */
export const copy = (text: string, fn: () => any) => {
  // 复制功能
  if (typeof document.execCommand !== 'function') {
    
    return
  }
  const dom = document.createElement('textarea')
  dom.value = text
  dom.setAttribute('style', 'display: block;width: 1px;height: 1px;')
  document.body.appendChild(dom)
  dom.select()
  const result = document.execCommand('copy')
  document.body.removeChild(dom)
  if (result) {
    typeof fn === 'function' && fn()
    return
  }
  if (typeof document.createRange !== 'function') {
    return
  }
  const range = document.createRange()
  const div = document.createElement('div')
  div.innerHTML = text
  div.setAttribute('style', 'height: 1px;fontSize: 1px;overflow: hidden;')
  document.body.appendChild(div)
  range.selectNode(div)
  const selection: any = window.getSelection()
  if (selection.rangeCount > 0) {
    selection.removeAllRanges()
  }
  selection.addRange(range)
  document.execCommand('copy')
  typeof fn === 'function' && fn()
}

//* *  清理接口参数 去除空数据 */
export const formatApiParams = (data: any) => {
  const newData = { ...data }
  for (const key in newData) {
    if (
      data[key] === '' ||
      data[key] === null ||
      data[key] === undefined ||
      JSON.stringify(data[key]) === '[]' ||
      JSON.stringify(data[key]) === '[""]'
    ) {
      delete newData[key]
    }
  }
  return newData
}

// 设置客户端cookies
export  const setCookiesInClient = (key:string, val:any) => {
  Cookie.set(
   key,
   val,
   { expires: 1, domain: '.fandow.com' },
 )
}