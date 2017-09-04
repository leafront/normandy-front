
var router = require('koa-router')();

var querystring = require('querystring');

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

var data = require('../../model/data');



const {
	colorList,
	condition,
	carType,
	collateralLastFree,
	starterStatus,
	engineStatus,
	transmissionStatus,
	exhaustStatus,
	booleanOptions,
	certificateType,
	shiftingType,
	driverType,
	purchaseType,
	isWorkOk,
	interiorStatus,
	surfaceStatus
} = data;

const {

	getPage,
	mobileEncrypt,
	idCardEncrypt

} = common

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})


	const params = querystring.parse(ctx.req._parsedUrl.query);

	const currentPage = parseInt(params.page) || 1;


	const { results: borrowersList,page, page_size:pageSize,total_page: totalPage,total_count:totalCount } = await baseModel.get(ctx,{
		url:'/api/borrowers',
		data:{
			page:currentPage
		}
	})

	const showPage = 5;

	const iPage = getPage(currentPage,showPage);

	await ctx.render('borrowers',{
		pathName: ctx.path,
		borrowersList,
		authority,
		shop,
		roleList,
		showPage,
		totalPage,
		page:currentPage,
		iPage,
		isFirstPage:(currentPage - 1 ) == 0,
		isLastPage:currentPage * pageSize > totalCount
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


router.get('/add', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})



	await ctx.render('borrowers/add',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})

router.get('/bind', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	await ctx.render('borrowers/bind',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})

router.get('/vehicle/list/:id', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const vehicleId = ctx.params.id;

	const params = querystring.parse(ctx.req._parsedUrl.query);

	const detailId = params.id;

	const {results:list } = await baseModel.get(ctx,{
		url:`/api/vehicles/${vehicleId}/conditions`,
	})

	await ctx.render('borrowers/vehicle/list',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		detailId,
		list,
		condition,
		surfaceStatus,
		purchaseType,
		collateralLastFree,
		certificateType,
		starterStatus,
		engineStatus,
		transmissionStatus,
		exhaustStatus,
		isWorkOk,
		vehicleId
	})

})


router.get('/vehicle/add/:id', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const vehicleId = ctx.params.id;

	const params = querystring.parse(ctx.req._parsedUrl.query);

	const detailId = params.id;

	await ctx.render('borrowers/vehicle/list/add',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		vehicleId,
		detailId,
		collateralLastFree,
		starterStatus,
		engineStatus,
		transmissionStatus,
		exhaustStatus,
		purchaseType,
		booleanOptions,
		certificateType,
		isWorkOk,
		interiorStatus,
		surfaceStatus
	})

})

router.get('/:id', async (ctx,next) => {

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

	console.log(borrowersList)

	await ctx.render('borrowers/detail',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		borrowersList,
		colorList,
		detailId,
		borrowersInfo,
		mobileEncrypt,
		idCardEncrypt
	})

})


router.get('/:id/add', async (ctx,next) => {

	const detailId = ctx.params.id;

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	await ctx.render('borrowers/vehicle/add',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		detailId,
		shiftingType,
		driverType,
		carType,
		colorList
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



	await ctx.render('borrowers/vehicle/detail',{
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
