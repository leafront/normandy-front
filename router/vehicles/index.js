var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

var data = require('../../model/data');


var querystring = require('querystring');

const {
	colorList,
	borrowingStatus,
	subjectStatus
	} = data;

const {

	getPage

	} = common;

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const params = querystring.parse(ctx.req._parsedUrl.query);

	const currentPage = parseInt(params.page) || 1;

	const { results: vehiclesList,page, page_size:pageSize,total_page: totalPage,total_count:totalCount } = await baseModel.get(ctx,{
		url:'/api/vehicles',
		data:{
			page:currentPage
		}
	})


	const showPage = 5;

	const iPage = getPage(currentPage,showPage);


	await ctx.render('vehicles',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		vehiclesList,
		borrowingStatus,
		subjectStatus,
		colorList,
		showPage,
		totalPage,
		page:currentPage,
		iPage,
		isFirstPage:(currentPage - 1 ) == 0,
		isLastPage:currentPage * pageSize > totalCount
	})

})


router.get('/map/:id', async (ctx,next) => {

	const id = ctx.params.id;

	const { data: monitor } = await common.getInterface(ctx,{
		type: 'GET',
		url: 'http://192.168.1.250/api/tracking',
		data: {
			imeis: '693916032657362'
		}

	})

	console.log(JSON.stringify(monitor,null,2))


	await ctx.render('vehicles/map/index',{
		monitor
	})

})


router.post('/list',async (ctx,next) => {

	const body = ctx.request.body;

	await baseModel.get(ctx,{
		url:'/api/vehicles',
		data:body
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

module.exports = router;