import Koa from "koa";
const app = new Koa();
const appPort = process.env.APP_PORT || 8080;

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(appPort, () => console.log(`Listening for events on : ${appPort}`));
