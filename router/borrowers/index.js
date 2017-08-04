
var router = require('koa-router')();

var querystring = require('querystring');

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

const {
	colorList
} = common;

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

router.get('/detail/:id', async (ctx,next) => {

	const detailId = ctx.params.id;

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const { results:borrowersList } = await baseModel.get(ctx,{
		url:`/api/borrowers/${detailId}/vehicles`
	})


	const borrowersInfo = await baseModel.get(ctx,{
		url:`/api/borrowers/${detailId}`
	})

	await ctx.render('borrowers/detail',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		borrowersList,
		colorList,
		detailId,
		borrowersInfo
	})

})


router.get('/vehicle/:id', async (ctx,next) => {

	const id = ctx.params.id;

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const params = querystring.parse(ctx.req._parsedUrl.query);

	const detailId = params.id;

	const vehicles = await baseModel.get(ctx,{
		url:`/api/vehicles/${id}`
	})


	const carType = [{
		name: '大型汽车', value: 1
	}, {
		name: '小型汽车', value: 2
	},{
		name:'使馆汽车', value:3
	},{
		name:'领馆汽车', value:4
	},{
		name:'境外汽车', value:5
	},{
		name:'外籍汽车', value:6
	},{
		name:'两三轮摩托', value:7
	},{
		name:'轻便摩托车', value:8
	},{
		name:'使馆摩托车', value:9
	},{
		name: '领馆摩托车', value:10
	},{
		name:'境外摩托车', value:11
	},{
		name:'外籍摩托车', value:12
	},{
		name:'农用运输车', value:13
	},{
		name:'拖拉机', value:14
	},{
		name:'挂车', value:15
	},{
		name:'教练汽车',value:16
	},{
		name:'教练摩托车',value:17
	},{
		name: '香港入境车', value: 26
	},{
		name: '澳门入境车', value: 27
}];

	const driverType = ['两驱', '四驱'];

	await ctx.render('borrowers/vehicle',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		detailId,
		vehicles,
		carType,
		colorList,
		driverType
	})

})



module.exports = router;
