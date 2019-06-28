const path = require('path')
// 配置koa app
const Koa = require('koa')
let app = new Koa()
// 配置bodyparser
let bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// 配置art-template模板引擎
let render = require('koa-art-template')
render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})

// 配置静态资源
const static = require('koa-static-router');
app.use(static({
    dir: 'public',
    router: '/public/'
}))

// 加载路由
let router = require('./route/router.js')
//加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

//监听端口
let port = 4000
app.listen(port, function () {
    console.log('服务器已启动，请勿关闭窗口。这将占用' + port + '端口。')
})