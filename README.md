# 前端基础架构代码仓库

## Project setup
```
yarn install / npm install
```

### Compiles and hot-reloads for development
```
yarn dev / npm run dev
```

### Compiles and minifies for production
```
yarn build / npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 文件结构 
```shell
.
├── constants  全局公共常量（统一采用大写命名文件）
│   ├── COMMON.js 公共常量
├── hooks  全局钩子函数(需要用use开头命名文件)
│   ├── useSearch 搜索hooks
│   ├── useTable 搜索hooks
├── api  项目接口配置
│   ├── 需求模块-api
├── assets  静态文件（会经过打包）
│   └── images  图片文件
├── components  全局公共组件（方便区分第三方依赖组件）
│   ├── com-search 搜索组件
│   ├── com-table 表格组件
│   ├── com-pagination 分页组件
├── views  路由页面
│   ├── financial-report xx模块
│   ├── hr-management xx管理
├── router  路由文件
│   ├── financial-report-router xx模块路由
│   ├──── index.js
│   ├── hr-management-router xx管理路由
│   ├──── index.js
│   ├── index.js 总路由
├── layout  系统布局组件
├── store  全局状态管理（分模块管理状态）
│   ├── financial-report-store xx模块管理状态
│   ├──── index.js
│   ├── hr-management-store xx管理状态
│   ├──── index.js
│   ├── index.js 汇集所有管理状态
├── styles 全局样式文件
├── utils  全局公用方法
│   ├── time-utils.js 时间处理工具
│   ├── throttling-utils.js 节流处理工具
└── vite   vite.config.js配置文件

### ts
├── enum 枚举类型
├── bean 请求数据传输层
├── components (custom开头为自定义业务组件, the开头为纯组件，不依赖参数不改变参数只做展示效果)
├── interface 数据定义接口
├── model 数据逻辑处理层
```

### 关于引入类库或者组件的顺序问题
>一般是第三方类库在上方，本地文件在下方


### 使用自定义table

```html
  <ComTable :tableLoading="tableLoading" :pagination="pagination" :columns="columns" :dataSource="dataSource"
      @on-page="handlePage">
    <template #[item.slots.customRender]="scope" v-for="item in columns">
      <template v-if="item.dataIndex == 'operation'">
        <span style="color:red">操作</span>
      </template>
      <template v-else>{{ scope.scope.record[item.dataIndex] }}</template>
    </template>
  </ComTable>
```

### 自定义按钮
```html
  <div style="margin:10px 0">
    <ComButton></ComButton>&nbsp;
    <ComButton :infos="{ type: 'dashed', }">Dashed Button</ComButton>&nbsp;
    <ComButton :infos="{ type: 'primary', }">primary Button</ComButton>&nbsp;
    <ComButton :infos="{ type: 'text', }">text Button</ComButton>&nbsp;
    <ComButton :infos="{ type: 'link', }">link Button</ComButton>&nbsp;
    <ComButton :infos="{ type: 'Primary', disabled: true }">Primary(disabled)</ComButton>&nbsp;
    <ComButton :infos="{ type: 'Primary', loading: true }">loading Button</ComButton>&nbsp;
    <ComButton :infos="{ type: 'Primary' }">
      <template #icon-left>
        <SearchOutlined />
      </template>
      loading Button
      <template #icon-right>
        <DownloadOutlined  />
      </template>
    </ComButton>&nbsp;
  </div>
```