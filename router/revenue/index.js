var router = require('koa-router')();

var common = require('../../model/common');

var data = require('../../model/data');

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('revenue/index',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})

router.get('/report', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('revenue/report',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})

router.get('/list', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('revenue/list',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})

module.exports = router;
