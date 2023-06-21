/**
 * @name: babel.config
 * @author: 黄俊炎
 * @date: 2022-08-09 16:17
 * @description：babel.config
 * @update: 2022-08-09 16:17
 */

// .babelrc or babel-loader option
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }] // `style: true` 会加载 less 文件
  ]
}
