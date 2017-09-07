var router = require('koa-router')();

var common = require('../../model/common');

var baseModel = require('../../model/baseModel');

var data = require('../../model/data');

const {

	termUnit,
	repaymentType

} = data;

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

	const {items: list } = await baseModel.get(ctx,{
		url:'/api/calculator/calculation',
		data:{
			shop_id:shop.id
		}
	})

	console.log(list)
	await ctx.render('revenue/list',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		list,
		shopId:shop.id,
		termUnit,
		repaymentType
	})

})

module.exports = router;
