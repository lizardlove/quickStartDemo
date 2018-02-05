## QuickStart Demo

各种工具流越来越复杂，配置越来越多，但每次开项目，配置文件又是大同小异，快速启动配置文件

```bash
|-- .babelrc
|-- README.md
|-- config.json              # 应用配置
|-- package.json             # 项目配置
|-- postcss.config.js        # postcss配置
|-- gulpfile.js              # gulp配置
|-- server.dev.js            # 开发服务器配置
|-- webpack.build.config.js  # 生产环境配置 
|-- webpack.dev.config.js    # 开发环境配置
|-- src                      
    |-- app.js               # 生产服务器配置
    |-- public               # 前端模板组
        |-- index.html
        |-- index.js
        |-- index.less
        |-- assets
    |-- controller           # 后端逻辑组
        |-- controller.js
```

### 开发环境启动

#### 启动命令

```
npm run dev
```

#### 开发环境配置

##### Express

`server.dev` : 开发服务器总配置文件，使用`webpack-dev-middleware` ,  `webpack-hot-middleware` 等中间件关联`webpack.dev.config` 的相关配置，达到前端模板组的热更新

##### webpack

`webpack.dev.config` : 配置`babel` , `less` 及相关前端第三方插件的管理

##### gulp

`gulefile development` :  使用`watch` 监听`src/controller` 中后端逻辑组的修改，实时启动`babel` 进行编译，启动`pm2` 监控`server.dev` ，完成后端逻辑组的热更新

###### 开发环境下，可使用ES6/7 + less 进行统一开发，前后端热更新。修改`babel` 相关可转换为`vue` , `TypeScript` 的开发。

### 生产环境启动

#### 启动命令

```
npm run build
```

#### 生产环境配置

##### Express

`app` : 生产服务器配置，设置`public` 静态监听， 后端逻辑`api` 转发至`controller/controller`

##### webpack

`webpack.build.config` : 配置`babel` , `less` , `url` 相关loader编译前端模板组文件，使用`extract-text-webpack-plugin` 分离打包`css` 文件，使用`copy-webpack-plugin` ，`imagemin-webpack-plugin` 压缩打包图片，字体等文件， 使用`html-webpack-plugin` 编译主页面

##### gulp

`gulpfile production` : 使用`babel` 编译后端逻辑组文件和`app` , 引入`wenpack` 及其生产配置文件`webpack.build.config` 对前端模板组文件进行打包编译

###### `npm run buiild` 使用 `gulp production` 命令，一次性将相关文件全部打包至`build` ,  `build` 文件夹内是独立完整项目






