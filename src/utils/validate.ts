/**
 * @name: reg
 * @author: 黄俊炎
 * @date: 2022-08-13 17:19
 * @description：reg
 * @update: 2022-08-13 17:19
 */

export const reg_number = /^[1-9]\d*$/

/* 一个点 */
export const reg_d = /^-?\d*(\.\d*)?$/

/* 大陆手机号 */
export const reg_phone =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

/* 2-4个中文字符正则 */
export const reg_c_name = /^[\u4e00-\u9fa5]{2,4}$/

/* 电子邮箱 */
export const reg_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

/* 身份证 */
export const reg_IdCard = {
  /* 普通校验 */
  reg_IdCard_ord: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  /* 18位 */
  reg_IdCard_er: /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
}
