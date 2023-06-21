
/**
 * 分页接口
 */
export interface paginationInterFace {
  total: Number,
  current: Number,
  pageSize: Number,
}

/**
 * 搜索参数
 */
export interface pageEventInterFace {
  pageIndex: number | string,
  pageSize:  number | string,
  field?:  string | undefined,
  sortType?:  string | undefined,
}


export interface columnsItemInterFace {
  title: string, // 标题
  dataIndex: string, // 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
  // Vue 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
  key?: string,
  sorter?: boolean, // 排序
  fixed?:string , //固定列 left,right
  width:string | number
  // slots这个是重点,通过这个相当于告诉表格组件我有一个具名插槽要用,名字就是customRender后面的名字, 
  // 父组件中的useSlots插槽的实例就有这个ResourceName,下面也一样
  slots: {
    customRender: string
  },
}
