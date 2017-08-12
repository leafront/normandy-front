var koa = require('koa');
var app = new koa();
var server = require('koa-static');
var render = require('koa-ejs');
var Router = require('koa-router');

var koaBody = require('koa-body');

var views = require('koa-views');

var router = new Router();

var error = require('./router/error/index');

var index = require('./router/index');

var message = require('./router/message/index');

var user = require('./router/user/index');

var borrowers = require('./router/borrowers/index');

var vehicles = require('./router/vehicles/index');

var business = require('./router/business/index');

var personnel = require('./router/personnel/index');

var authority = require('./router/authority/index');

var account = require('./router/account/index');

var shop = require('./router/shop/index');

app.use(server(__dirname + '/public'));

app.use(koaBody());
//set ejs default


app.use(views(__dirname + '/views',{
	extension:'ejs'
}))


//app.use(async (ctx, next) => {
//
//	try {
//
//		await next();
//
//		if (ctx.status == 404) {
//
//			ctx.redirect('/error/404?path='+ctx.path);
//
//		}
//
//	} catch (err) {
//
//		console.log(err)
//
//		if (err.statusCode == 401) {
//
//			ctx.redirect('/user/login?returnurl=' + ctx.path);
//
//		} else if (err.statusCode == 403 || err.statusCode == 404) {
//
//			ctx.redirect('/error/404?path='+ctx.path);
//
//		} else if (err.statusCode == 500) {
//
//			ctx.redirect('/error/500?path='+ctx.path);
//
//		}
//	}
//})
router.use('/',index.routes());

router.use('/error',error.routes());

router.use('/message',message.routes());

router.use('/user',user.routes());

router.use('/borrowers',borrowers.routes());

router.use('/vehicles',vehicles.routes());

router.use('/business',business.routes());

router.use('/personnel',personnel.routes());

router.use('/account',account.routes());

router.use('/authority',authority.routes());

router.use('/shop',shop.routes());

app.use(router.routes());


app.listen(3000);
