var router = require('koa-router')();

var common = require('../../model/common');

var baseModel = require('../../model/baseModel');

var querystring = require('querystring');

var path = require('path');

var fs = require('fs');

const {

	getPage

} = common;

router.get('/:id', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const userId = ctx.params.id;

	const params = querystring.parse(ctx.req._parsedUrl.query);

	const currentPage = parseInt(params.page) || 1;


	const { results:messageList, page, page_size:pageSize,total_page: totalPage,total_count:totalCount } = await baseModel.get(ctx,{
		url:`/api/${userId}/msgs`,
		data:{
			page: currentPage
		}
	})

  const pathName =  ctx.path;

	const showPage = 5;

	const iPage = getPage(currentPage,showPage);

	const pagination = path.resolve(__dirname + '/../../views/common/pagination.ejs');

	const listView = path.resolve(__dirname + '/../../views/message/list.ejs');

	const  paginationTpl = fs.readFileSync(pagination,'utf-8');

	const listTpl = fs.readFileSync(listView,'utf-8');

	const isRead = messageList.every((item) => {

		return item.status == 1;

	})

	await ctx.render('message/index',{
		pathName,
		authority,
		shop,
		roleList,
		messageList,
		showPage,
		totalPage,
		page:currentPage,
		iPage,
		paginationTpl,
		listTpl,
		isRead,
		isFirstPage:(currentPage - 1 ) == 0,
		isLastPage:currentPage * pageSize > totalCount
	})
})


router.post('/read',async (ctx,next) => {

	const data = ctx.request.body;

	const userId = data.userId;

	await baseModel.post(ctx,{
		url:`/api/${userId}/msgs`,
		data:{
			data
		}
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/list',async (ctx,next) => {

	const { userId, page } = ctx.request.body;

	await baseModel.get(ctx,{
		url:`/api/${userId}/msgs`,
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



module.exports = router;
