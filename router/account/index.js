
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




module.exports = router;
