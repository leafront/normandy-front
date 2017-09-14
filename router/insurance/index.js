var router = require('koa-router')();

var querystring = require('querystring');

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

var data = require('../../model/data');

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
		roleList
	})

})

module.exports = router;
