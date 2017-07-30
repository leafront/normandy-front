/**
 * Created by leafrontye on 2017/7/28.
 */

var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const colorList = [
		{'name':'银色',   'value': 0},
		{'name':'黑色',   'value': 1},
		{'name': '白色',   'value': 2},
		{'name': '灰色',   'value': 3},
		{'name': '红色',   'value': 4},
		{'name': '金色',   'value': 5},
		{'name': '黄色',   'value': 6},
		{'name': '绿色',   'value': 7},
		{'name': '紫色',   'value': 8},
		{'name': '橙色',   'value': 9},
		{'name': '棕色',   'value': 10},
		{'name': '米色',   'value': 11},
		{'name': '巧克力色', 'value': 12},
		{'name': '香槟色', 'value': 13}
	];

	await ctx.render('business',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		vehiclesList,
		colorList
	})

})

module.exports = router;
