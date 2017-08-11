var router = require('koa-router')();

var querystring = require('querystring');

var path = require('path');

var fs = require('fs');

var common = require('../../model/common');

var baseModel = require('../../model/baseModel');

const {

	getPage

} = common;

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})


	const params = querystring.parse(ctx.req._parsedUrl.query);

	const currentPage = parseInt(params.page) || 1;


	const { results:userList, page, page_size:pageSize,total_page: totalPage,total_count:totalCount } = await baseModel.get(ctx,{
		url:'/api/users',
		data:{
			page: currentPage
		}
	})

	const pathName =  ctx.path;

	const showPage = 5;

	const iPage = getPage(currentPage,showPage);

	const pagination = path.resolve(__dirname + '/../../views/common/pagination.ejs');

	const listView = path.resolve(__dirname + '/../../views/personnel/list.ejs');

	const  paginationTpl = fs.readFileSync(pagination,'utf-8');

	const listTpl = fs.readFileSync(listView,'utf-8');


	await ctx.render('personnel',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		list:userList,
		showPage,
		totalPage,
		page:currentPage,
		iPage,
		paginationTpl,
		listTpl,
		isFirstPage:(currentPage - 1 ) == 0,
		isLastPage:currentPage * pageSize > totalCount
	})
})


router.post('/list',async (ctx,next) => {

	const body = ctx.request.body;

	await baseModel.get(ctx,{
		url: '/api/users',
		data: body
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


router.post('/role/switch',async (ctx,next) => {

	const body = ctx.request.body;

	const id = body.id;

	await baseModel.post(ctx,{
		type:'PATCH',
		url: `/api/users/${id}/status`,
		data: body
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


router.post('/role',async (ctx,next) => {

	await baseModel.get(ctx,{
		url: '/api/users/roles',
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/edit/roles',async (ctx,next) => {

	const body = ctx.request.body;

	const roleId = body.roleId;

	await baseModel.get(ctx,{
		url: `/api/users/${roleId}`
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/edit',async (ctx,next) => {

	const body = ctx.request.body;

	const id = body.id;

	await baseModel.post(ctx,{
		type:'PATCH',
		url: `/api/users/${id}/roles`,
		data:body
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/add',async (ctx,next) => {

	const body = ctx.request.body;

	await baseModel.post(ctx,{
		type:'POST',
		url: '/api/users',
		data:body
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/message',async (ctx,next) => {

	const body = ctx.request.body;

	const id = body.id;

	await baseModel.post(ctx,{
		type:'POST',
		url: `/api/users/${id}/activation`,
		data:body
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/activation',async (ctx,next) => {

	const body = ctx.request.body;

	const id = body.id;

	await baseModel.post(ctx,{
		type:'POST',
		url: `/api/users/${id}/activation`
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


module.exports = router;
