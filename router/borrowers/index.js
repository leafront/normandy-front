
var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})


	const { results: borrowersList} = await baseModel.get(ctx,{
		url:'/api/borrowers',
		page:1
	})


	await ctx.render('borrowers',{
		pathName: ctx.path,
		borrowersList,
		authority,
		shop,
		roleList
	})

})


router.get('/modify/password', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})


	await ctx.render('borrowers/modify/password',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})

module.exports = router;
