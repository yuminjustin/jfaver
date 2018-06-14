const Koa = require('koa');
const Static = require('koa-static');
const path = require('path');

const app = new Koa();
const staticPath = './';

app.use(Static(path.resolve(__dirname, staticPath)));

app.listen(8080);
