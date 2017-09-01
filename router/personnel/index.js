var router = require('koa-router')();

var querystring = require('querystring');

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
		isFirstPage:(currentPage - 1 ) == 0,
		isLastPage:currentPage * pageSize > totalCount
	})
})


module.exports = router;
