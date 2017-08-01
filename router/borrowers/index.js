
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

	await ctx.render('borrowers/detail',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		borrowersList,
		colorList,
		detailId
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

	await ctx.render('borrowers/vehicle',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		detailId,
		vehicles
	})

})



module.exports = router;
