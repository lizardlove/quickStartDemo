### QuickStart Demo

各种工具流越来越复杂，配置越来越多，但每次开项目，配置文件又是大同小异，快速启动配置文件

```bash
|-- .babelrc
|-- package.json
|-- postcss.config.js        #postcss配置
|-- README.md
|-- server.dev.js            #开发服务器配置
|-- webpack.build.config.js  #生产环境配置 
|-- webpack.dev.config.js    #开发环境配置
|-- src                      #前端模板
    |-- index.html
    |-- index.js
    |-- index.less
    |-- static
        |-- to.png
|-- app                      #后端（中端）配置
    |-- controller.js
```

两套webpack配置分别应用于开发环境和生产环境，开发环境以快速启动，热更新为主，生产环境以文件配置，文件处理主

#### webpack.dev.config + server.dev + pm2

使用自定义express项目，搭载webpack-hot-middleware，使用pm2启动，实现全端监控

#### webpack.build.config

主要用于生产配置，导出纯前端静态文件，实现js，css的导出，压缩，图片打包，压缩




