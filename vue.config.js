// const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { version } = require('./package')
const pages = require('./config/pages.config.js')
const webpackCfg = require('./config/webpack.config.js')
const proxyTable = require('./config/proxyTable.js')

const isProd = process.env.NODE_ENV === 'production'


process.env.VUE_APP_VERSION = version

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: './dist',
  assetsDir: "static",
  filenameHashing: true,
  productionSourceMap: false,
  css: {
    extract: true
  },
  pages,
  devServer: {
    // https: true,
    host: "0.0.0.0",
    disableHostCheck: true,
    hot: false,
    port: 9001,
    inline: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: proxyTable
  },
  chainWebpack: config => {
    webpackCfg(config)
  }
}
