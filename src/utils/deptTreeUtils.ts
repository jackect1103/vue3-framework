/**
 * 查询上一级id
 * @param deptId 需要查询的id
 * @param dept 上一级
 */
type deptType = undefined | number | string
const searchDept = (list: any, deptId: string | number): deptType => {
  let id = [] as any
  let len = list.length
  let middle = Math.ceil(len / 2)
  let leftList = list.slice(0, middle)
  let rightList = list.slice(middle)
  for (let i = 0; i < leftList.length; i++) {
    if (leftList[i].children) {
      let hasId = searchDept(leftList[i].children, deptId) || []
      hasId.length != 0 && id.push(leftList[i].id,...hasId)
      if (id.length != 0) break
    } else if (leftList[i].id == deptId) {
      id.push(deptId)
      break
    }
  }
  if (id.length == 0) {
    for (let i = 0; i < rightList.length; i++) {
      if (rightList[i].children) {
        let hasId = searchDept(rightList[i].children, deptId) || []
        hasId.length != 0 && id.push(rightList[i].id,...hasId)
        if (id.length != 0) break
      } else if (rightList[i].id == deptId) {
        id.push(deptId)
        break
      }
    }
  }
  return id
}

export {
    searchDept
}