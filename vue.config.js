const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  // outputDir: 'dist',
  // pages:{ type:Object,Default:undfind }
  // chainWebpack: config => {
  //   // 取消prefetch和preload
  //   config.plugins.delete('preload')
  //   config.plugins.delete('prefetch')
  // },
  devServer: {
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    // proxy: 'http://scjg.gzis.ac.cn', // 配置跨域处理,只有一个代理
    proxy: {
      // https://fssj.fsamr.foshan.gov.cn/fssjscjg-gzh-api/voip/wxjssdkSignature
      '/api': {
        target: 'http://222.200.99.167:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "@/assets/assets/css/common.scss";`
  //     }
  //   }
  // },
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  }
})
