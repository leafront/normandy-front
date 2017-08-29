var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

var data = require('../../model/data');


var querystring = require('querystring');

const {
	colorList,
	borrowingStatus,
	subjectStatus,
	carType,
	driverType
	} = data;

const {

	getPage,
	dateFormat

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


router.get('/:id', async (ctx,next) => {

	const id = ctx.params.id;

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const vehicles = await baseModel.get(ctx,{
		url:`/api/vehicles/${id}`
	})



	await ctx.render('vehicles/detail',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		vehicles,
		carType,
		colorList,
		driverType
	})

})

router.get('/map/:id', async (ctx,next) => {

	const deviceId = ctx.params.id;

	const { data: monitor } = await common.getInterface(ctx,{
		type: 'GET',
		url: 'http://192.168.1.250/api/tracking',
		data: {
			imeis: '693916032657362'
		}

	})

	const { result:location } =  await common.getInterface(ctx,{
		type: 'GET',
		url: 'http://api.map.baidu.com/geocoder/v2/',
		data: {
			location: monitor[0].lat + ',' + monitor[0].lng ,
			output:'json',
			pois:0,
			ak:'98f295e5e3451c60b1036212f1f621e9'
		}

	})

	await ctx.render('vehicles/map/index',{
		monitor,
		location,
		deviceId
	})

})


router.get('/trace/:id', async (ctx,next) => {

	const id = ctx.params.id;

	const { data: monitor } = await common.getInterface(ctx,{
		type: 'GET',
		url: 'http://192.168.1.250/api/tracking',
		data: {
			imeis: '668613120071423'
		}

	})

	const { result:location } =  await common.getInterface(ctx,{
		type: 'GET',
		url: 'http://api.map.baidu.com/geocoder/v2/',
		data: {
			location: monitor[0].lat + ',' + monitor[0].lng ,
			output:'json',
			pois:0,
			ak:'98f295e5e3451c60b1036212f1f621e9'
		}

	})

	await ctx.render('vehicles/trace/index',{
		monitor,
		location,
		dateFormat
	})

})

router.get('/history/:id', async (ctx,next) => {

	const id = ctx.params.id;


	await ctx.render('vehicles/history/index',{

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

router.post('/location',async (ctx,next) => {

	const { lat, lng } = ctx.request.body;

	await common.getInterface(ctx, {
		type: 'GET',
		url: 'http://api.map.baidu.com/geocoder/v2/',
		data: {
			location: lat + ',' + lng,
			output: 'json',
			pois: 0,
			ak: '98f295e5e3451c60b1036212f1f621e9'
		}
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

module.exports = router;