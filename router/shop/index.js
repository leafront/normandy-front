var router = require('koa-router')();

var common = require('../../model/common');

var baseModel = require('../../model/baseModel');

var querystring = require('querystring');

const {
	getPage
} = common;

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const params = querystring.parse(ctx.req._parsedUrl.query);

	const currentPage = parseInt(params.page) || 1;

	const { results:shopList, page_size:pageSize,total_page: totalPage,total_count:totalCount } = await baseModel.get(ctx,{
		url:'/api/admin/shops',
		data:{
			page: currentPage
		}
	})


	const showPage = 5;

	const iPage = getPage(currentPage,showPage);

	await ctx.render('shop',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		list:shopList,
		showPage,
		totalPage,
		page:currentPage,
		iPage,
		isFirstPage:(currentPage - 1 ) == 0,
		isLastPage:currentPage * pageSize > totalCount
	})


})


router.post('/list',async (ctx,next) => {

	const { page } = ctx.request.body;

	await baseModel.get(ctx,{
		url:'/api/admin/shops',
		data:{
			page
		}
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


router.post('/provinces',async (ctx,next) => {

	const { page } = ctx.request.body;

	await baseModel.get(ctx,{
		url:'/api/provinces',
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


router.post('/citys',async (ctx,next) => {

	const { id } = ctx.request.body;

	await baseModel.get(ctx,{
		url:`/api/provinces/${id}/cities`,
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


router.post('/edit',async (ctx,next) => {

	const { id } = ctx.request.body;

	await baseModel.get(ctx,{
		url:`/api/admin/shops/${id}`,
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})



router.post('/edit/list',async (ctx,next) => {

	const body = ctx.request.body;

	const { id } = body;

	await baseModel.post(ctx,{
		type:'PATCH',
		url:`/api/admin/shops/${id}`,
		data:body
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/add/list',async (ctx,next) => {

	const body = ctx.request.body;

	await baseModel.post(ctx,{
		type:'POST',
		url:'/api/admin/shops',
		data:body
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


module.exports = router;
