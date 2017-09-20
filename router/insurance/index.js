var router = require('koa-router')();

var querystring = require('querystring');

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

var data = require('../../model/data');

const {

	booleanOptions

} = data;

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('insurance/index',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})

router.get('/info', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('insurance/info',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		booleanOptions
	})

})

router.get('/price', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('insurance/price',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		booleanOptions
	})

})

router.get('/delivery', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('insurance/delivery',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})


router.get('/confirm', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('insurance/confirm',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})

module.exports = router;
