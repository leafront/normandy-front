var koa = require('koa');
var app = new koa();
var server = require('koa-static');
var render = require('koa-ejs');
var Router = require('koa-router');

var views = require('koa-views');

var gzip = require('koa-gzip');



var router = new Router();

var index = require('./router/index');

var user = require('./router/user/index');

var borrowers = require('./router/borrowers/index');

app.use(gzip());


app.use(server(__dirname + '/public'));

//set ejs default


app.use(views(__dirname + '/views',{
	extension:'ejs'
}))




router.use('/',index.routes());

router.use('/user',user.routes());
router.use('/borrowers',borrowers.routes());

app.use(router.routes());


app.listen(3000);
