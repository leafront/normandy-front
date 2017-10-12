
var router = require('koa-router')();

var common = require('../../model/common');

var baseModel = require('../../model/baseModel');

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})


	const { results:authorityList } = await baseModel.get(ctx,{
		url:'/api/admins/roles'
	})

	await ctx.render('authority',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		authorityList
	})
})






module.exports = router;

