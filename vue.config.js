/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: ranli
 * @Date: 2020-02-19 14:47:16
 * @LastEditors: ranli
 * @LastEditTime: 2020-02-27 14:54:53
 */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  configureWebpack: {},
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@images', resolve('src/assets/img'))
      .set('@cmp', resolve('src/components'))
      .set('@common', resolve('src/common'))
      .set('@views', resolve('src/views'))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/mixin.less')]
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.join(
            __dirname,
            'src/assets/css/variables.less'
          )}";`
        }
      }
    }
  },
  // devServer: {
  //   port: 8080,
  //   proxy: {
  //     '/singleMuseum': {
  //       target: 'http://dev.tj720.com', // 内测环境
  //       // target: 'http://192.168.5.198:8888', // 谢少雄
  //       ws: false,
  //       changeOrigin: true
  //     }
  //   }
  // },
  lintOnSave: undefined
}
