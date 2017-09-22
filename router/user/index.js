
var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

router.get('/login', async (ctx,next) => {

	const captcha =  await baseModel.post(ctx,{
		type:'POST',
		gateway:'gatewayExt',
		url:'/api/captcha'
	})

	await ctx.render('user/login',{
		captcha: captcha
	})

})


router.get('/register', async (ctx,next) => {

	const captcha =  await baseModel.post(ctx,{
		type:'POST',
		gateway:'gatewayExt',
		url:'/api/captcha'
	})

	await ctx.render('user/register',{
		captcha: captcha
	})

})


router.get('/register/:key', async (ctx,next) => {

	const mobile_key = ctx.params.key;

	await ctx.render('user/register/verify',{
		mobile_key: mobile_key
	})

})

router.get('/forget', async (ctx,next) => {

	const captcha =  await baseModel.post(ctx,{
		type:'POST',
		gateway:'gatewayExt',
		url:'/api/captcha'
	})

	await ctx.render('user/forget',{
		captcha: captcha
	})
})

router.get('/forget/:key', async (ctx,next) => {

	const mobile_key = ctx.params.key;

	await ctx.render('user/reset',{
		mobile_key
	})
})

router.post('/login',async (ctx,next) => {

	const data = ctx.request.body;

	await baseModel.post(ctx,{
		type:'POST',
		gateway:'gatewayExt',
		url:'/api/login',
		data:data
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/register/mobile',async (ctx,next) => {

	const data = ctx.request.body;

	await baseModel.post(ctx,{
		type: 'POST',
		gateway:'gatewayExt',
		url:'/api/signup/mobile',
		data:data
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})


})



router.post('/reset/validator',async (ctx,next) => {

	const data = ctx.request.body;

	await baseModel.post(ctx,{
		type: 'POST',
		gateway:'gatewayExt',
		url:'/api/reset/validator',
		data:data
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/register',async (ctx,next) => {

	const data = ctx.request.body;

	await baseModel.post(ctx,{
		type: 'POST',
		gateway:'gatewayExt',
		url:'/api/signup',
		data:data
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})
router.post('/reset/password',async (ctx,next) => {

	const data = ctx.request.body;


	await baseModel.post(ctx,{
		type: 'POST',
		url:'/api/reset/password',
		gateway:'gatewayExt',
		data:data
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})


})




router.post('/auth/jwt',async (ctx,next) => {

	const data = ctx.request.body;


	const authorization = ctx.request.header.authorization;

	await baseModel.get(ctx,{
		url:'/api/auth/jwt',
		data:data,
		header:{
			authorization
		}
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})


})


router.post('/verify',async (ctx,next) => {

	await baseModel.post(ctx,{
		type:'POST',
		gateway:'gatewayExt',
		url:'/api/captcha'
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


router.post('/message',async (ctx,next) => {

	await baseModel.get(ctx,{
		url:'/api/current-user/unread-msgs'
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


router.post('/read',async (ctx,next) => {

	const data = ctx.request.body;

	const userId = data.userId;

	await baseModel.post(ctx,{
		type:'POST',
		url:`/api/${userId}/msgs`,
		data
	}).then((body) => {
		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


router.post('/activate',async (ctx,next) => {

	const { key,password } = ctx.request.body;

	await baseModel.post(ctx,{
		type:'POST',
		url:`/api/activation/${key}`,
		gateway:'gatewayExt',
		data:{
			password
		}
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		console.log(err);

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})







module.exports = router;