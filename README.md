##  nodejs 环境

    nodejs v 8.6.0

    koa框架 2.3.0

    说明: nodejs 代码涉及到ECMAScript 6、7 语法

    部署环境

     npm install  --> 安装package.json 里面的依赖模块

     启动环境

     npm start --> 开启本地环境

     npm run production_pack 打包压缩静态资源文件

     npm run production --> 启动node线上环境   pm2 kill --> 退出 线上环境




## 常规项目代码目录
```
  model --> 模型类

    baseModel.js  封装nodejs 请求api 接口的 get、post 的方法

    common.js 常用的公共方法


  .gitignore --> git 忽略文件

  public --> 前端静态资源

        styles --> css 样式文件

        scripts -->

            lib --> 常用类库

                jquery.js 框架

                ejs.js 模板文件

                laydate.js 日历第三方控价




        widget --> 定制组件


            Lizard.js  封装常用JS 的方法

            calendar.js 日历控价

        common.js --> 公共的方法调用

        images --> 图片文件



  routes --> nodejs 路由配置


  sass  --> sass 原文件


  views -->  nodejs 打包渲染模板文件

  templates --> nodejs 渲染模板文件


  gulpfile.js --> gulp 打包sass 编译styles -->public/styles

  package.json --> nodejs 的模块文件版本

  server.js -->  nodejs 入口文件

  webpack.config.js --> webpack 打包配置文件

```
