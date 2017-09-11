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
		isFirstPage:(totalPage - 1 ) == 0,
		isLastPage:currentPage * pageSize >= totalCount
	})


})

module.exports = router;
