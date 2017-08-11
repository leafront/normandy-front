/**
 * Created by leafrontye on 2017/7/26.
 */

var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

var data = require('../../model/data');

const {
	colorList
} = data;

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const { results: vehiclesList} = await baseModel.get(ctx,{
		url:'/api/vehicles',
		page:1
	})


	await ctx.render('vehicles',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		vehiclesList,
		colorList
	})

})

module.exports = router;
