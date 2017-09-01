var router = require('koa-router')();

var common = require('../../model/common');

var data = require('../../model/data');

const {

	repaymentType,
	termUnit

} = data;

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('revenue/index',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		termUnit,
		repaymentType
	})


})

module.exports = router;
