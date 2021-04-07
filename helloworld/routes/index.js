const router = require('koa-router')()

// 视图渲染
// render 是因为添加了 koa-views 中间件而绑定到 ctx 上的，原本的 ctx 上是没有 render 函数的
// 也就是说我们可以通过中间件在 ctx 上绑定我们要使用的功能
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

// 字符串
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

// JSON API
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
