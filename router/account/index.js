
var router = require('koa-router')();

var common = require('../../model/common');

var baseModel = require('../../model/baseModel');

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('account',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})
})


router.post('/sina', async (ctx,next) => {

	await baseModel.get(ctx,{
		url:'/api/sina-account'
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/card', async (ctx,next) => {

	await baseModel.get(ctx,{
		url:'/api/sina-card'
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/recharge', async (ctx,next) => {

	const data = ctx.request.body;

	await baseModel.post(ctx,{
		type: 'POST',
		url: '/api/recharge',
		data: data
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/cash', async (ctx,next) => {

	const data = ctx.request.body;

	console.log(data)

	await baseModel.post(ctx,{
		type: 'POST',
		url: '/api/withdrawal',
		data: data
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})



module.exports = router;
