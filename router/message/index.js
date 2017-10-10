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


	const { results:messageList, page_size:pageSize,total_page: totalPage,total_count:totalCount } = await baseModel.get(ctx,{
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
		isLastPage:currentPage * pageSize >= totalCount
	})
})


module.exports = router;
