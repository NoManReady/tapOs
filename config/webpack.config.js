const path = require('path')
const prodCfg = require('./webpack.config.prod.js')
const devCfg = require('./webpack.config.dev.js')

const isProd = process.env.NODE_ENV === 'production'
const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = config => {
  // 通用配置
  // 设置路径别名
  config.resolve.alias.set('@', resolve('./src')).end()
    .extensions.merge(['.css'])
  // 配置worker-loader
  // config.module
  //   .rule('worker')
  //   .test(/\.worker.js$/)
  //   .use('worker-loader')
  //   .loader('worker-loader')
  //   .end()
  // 配置scss变量
  let oneOfsMap = config.module.rule("scss").oneOfs.store
  oneOfsMap.forEach(item => {
    item
      .use("sass-resources-loader")
      .loader("sass-resources-loader")
      .options({
        resources: [
          resolve("src/style/var/_variable.scss"),
          resolve("src/style/var/_theme.scss"),
          resolve("src/style/var/_mixins.scss")
        ]
      })
      .end()
  })
  if (isProd) {
    prodCfg(config)
  } else {
    devCfg(config)
  }
  // 修复热更新失效
  config.resolve.symlinks(true)
}