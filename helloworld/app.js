const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler 错误处理
onerror(app)

// middlewares 中间件
// 解析 post 类 HTTP 动词的 body 内容，加上 bodyparser 后就可以处理所有请求了
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// 更好的支持 JSON
app.use(json())
// 开发阶段日志
app.use(logger())
// 提供 HTTP 静态托管服务
app.use(require('koa-static')(__dirname + '/public'))
// 视图渲染，支持模板引擎
// extension: 可支持其他模板 如 React
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger 日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes 路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling 
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
