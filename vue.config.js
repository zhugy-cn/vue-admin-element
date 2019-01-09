const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 全局变量
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/global.scss";
        `
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_com', resolve('src/components'))
      .set('_api', resolve('src/api'))
      .set('_views', resolve('src/views'))
  }
}