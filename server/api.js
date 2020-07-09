// mock 接口
const Koa = require('koa');
const app = new Koa();
const bodyparser = require("koa-bodyparser");
const router = require("koa-router")({ prefix: "/api" });

// 设置cookie加密秘钥
app.keys = ["some secret", "another secret"];


// 登录
router.post("/login", ctx => {
  const user = ctx.request.body;
  if (user.userName === "test" && user.password === "123456") {
    // 将token存入cookie
    const token = 'a mock token';
    ctx.cookies.set('token', token, {
      httpOnly: false
    });
    ctx.body = { ok: 1, token };
  } else {
    ctx.body = { ok: 0 };
  }
});

// 注册
router.post("/register", ctx => {
  const user = ctx.request.body;
  const token = 'a mock token';
  ctx.cookies.set('token', token, {
    httpOnly: false
  });
  ctx.body = { ok: 1, token };
})

// 获取信息
router.get("/info", ctx => {
  ctx.body = { ok: 1, info: {aaa: 2222} }
})

// 解析post数据并注册路由
app.use(bodyparser());
// 注册路由
app.use(router.routes());

app.listen(9090, () => console.log('api服务已启动'))
