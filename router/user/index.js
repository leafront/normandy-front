
var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

router.get('/login', async (ctx,next) => {

	const captcha =  await baseModel.post(ctx,{
		url:'/api/captcha'
	})

	await ctx.render('user/login',{
		captcha: captcha
	})


})

module.exports = router;