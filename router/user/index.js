
var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

router.get('/login', async (ctx,next) => {

	const captcha =  await baseModel.post(ctx,{
		gateway:'gatewayExt',
		url:'/api/captcha'
	})


	await ctx.render('user/login',{
		captcha: captcha
	})

})


router.get('/register', async (ctx,next) => {

	const captcha =  await baseModel.post(ctx,{
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


module.exports = router;