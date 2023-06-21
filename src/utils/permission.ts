/**
 * @Description: 自定义权限指令 用于操作按钮显示
 * @author
 * @date 2023/3/30
 */
const permission = {
  // 在元素被插入到 DOM 前调用
  mounted(el: any, binding: any) {
    const permissionList = JSON.parse(localStorage.getItem('permissions')) || []
    if (!permissionList.includes(binding.value)) {
      el.style.display = 'none'
    }
  }
}
export default permission
