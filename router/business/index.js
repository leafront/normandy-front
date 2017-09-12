
var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

var data = require('../../model/data');

var querystring = require('querystring');

const uploadImg = [
	{
		type: 'cover_pic',
		name: '封面图'
	},
	{
		type: 'apply_pics',
		name: '申请资料图'
	},
	{
		type: 'call_records',
		name: '通话记录'
	},
	{
		type: 'contract_pics',
		name: '合同资料'
	},
	{
		type: 'supporting_pics',
		name: '三方证明资料'
	},{
		type: 'violation_records',
		name: '违章资料'
	},
];

const {

	mobileEncrypt,
	idCardEncrypt,
	getPage
} = common;

const {
	loanType,
	seniority,
	companyScale,
	gender,
	emerContactFrequency,
	answerStatus,
	livingConditions,
	borrowingConditions,
	selfResidenceTime,
	borrowingStage,
	borrowingResult,
	borrowingRating,
	condition,
	nation,
	borrowingType,
	termUnit,
	borrowingStatus,
	autoReviewStatus,
	phoneReviewStatus,
	booleanOptions,
	nullBooleanOptions,
	interiorStatus,
	surfaceStatus,
	shiftingType,
	driverType,
	collateralLastFree,
	repaymentType,
	purchaseType,
	maritalStatus,
	maritalStatusList,
	borrowingSeriesType,
	salaryType,
	purposeType,
	companyType,
	education,
	isWorkOk,
	transmissionStatus,
	exhaustStatus,
	certificateType,
	starterStatus,
	engineStatus,
	carType,
	colorList
} = data;

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const params = querystring.parse(ctx.req._parsedUrl.query);

	const currentPage = parseInt(params.page) || 1;

	const { results: businessList,page, page_size:pageSize,total_page: totalPage,total_count:totalCount } = await baseModel.get(ctx,{
		url:'/api/borrowings',
		data:{
			page:currentPage
		}
	})

	const showPage = 5;

	const iPage = getPage(currentPage,showPage);

	await ctx.render('business/index',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		businessList,
		termUnit,
		borrowingType,
		borrowingStatus,
		autoReviewStatus,
		phoneReviewStatus,
		showPage,
		totalPage,
		page:currentPage,
		iPage,
		isFirstPage:(totalPage - 1 ) == 0,
		isLastPage:currentPage * pageSize >= totalCount
	})

})

router.get('/loan', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('business/loan',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		nation,
		maritalStatusList,
		companyType,
		education,
		salaryType,
		nullBooleanOptions
	})

})

router.get('/:id', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const id = ctx.params.id;

	const business = await baseModel.get(ctx,{
		url:`/api/borrowings/${id}`
	})

	const application = business.application;

	const vehicleId = business.application.vehicle.id;


	const conditionList = await baseModel.get(ctx,{
		url:`/api/vehicles/${vehicleId}/conditions`
	})

	const conditionInfo = conditionList.results[0];



  function reviewPermission (status){

		switch(status){
			case 0:
				return roleList.indexOf('SHOP_REVIEW') > -1;
			case 1:
				return roleList.indexOf('MASTER_REVIEW') > -1;
			case 2:
				return roleList.indexOf('ACCOUNTANT_REVIEW') > -1;
			case 3:
				return roleList.indexOf('RETRIAL') > -1;
		}

		return false;

	}
	const vehicle = business.application.vehicle;

	await ctx.render('business/detail',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		reviewPermission,
		detailId:id,
		borrowingStatus,
		borrowingType,
		termUnit,
		repaymentType,
		carType,
		colorList,
		shiftingType,
		purchaseType,
		isWorkOk,
		transmissionStatus,
		exhaustStatus,
		starterStatus,
		engineStatus,
		collateralLastFree,
		certificateType,
		driverType,
		booleanOptions:condition,
		interiorStatus,
		maritalStatus,
		borrowingSeriesType,
		purposeType,
		companyType,
		salaryType,
		surfaceStatus,
		education,
		mobileEncrypt,
		idCardEncrypt,
		uploadImg,
		business,
		application,
		condition:conditionInfo,
		vehicle
	})

})

router.get('/approval/:id', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx, {
		url: '/api/current-user'
	})

	const detailId = ctx.params.id;

	const params = querystring.parse(ctx.req._parsedUrl.query);

	const bidId = params.bid;

	const pidStatus = params.status;

	const { results: list } = await baseModel.get(ctx,{
		url:`/api/borrowings/${detailId}/approvals`,
	})
	await ctx.render('business/approval/index',{
		pathName: ctx.path,
		bidId,
		authority,
		pidStatus,
		shop,
		roleList,
		list,
		detailId,
		borrowingStage,
		borrowingStatus,
		borrowingResult,
		borrowingRating,
		carType

	})

})


router.get('/phone/:id', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx, {
		url: '/api/current-user'
	})

	const phoneId = ctx.params.id;

	const params = querystring.parse(ctx.req._parsedUrl.query);

	const detailId = params.id;

	await ctx.render('business/phone/index',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		phoneId,
		detailId,
		seniority,
		nullBooleanOptions,
		companyScale,
		answerStatus,
		selfResidenceTime,
		livingConditions,
		borrowingConditions,
		booleanOptions,
		emerContactFrequency,
		gender
	})

})


router.get('/edit/:id', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx, {
		url: '/api/current-user'
	})

	const borrowingId = ctx.params.id;



	const business = await baseModel.get(ctx,{
		url:`/api/borrowings/${borrowingId}`
	})

	const { application } =  business;

	await ctx.render('business/edit/index',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		borrowingId,
		application,
		business,
		uploadImg,
		loanType,
		booleanOptions,
		mobileEncrypt,
		idCardEncrypt
	})

})

module.exports = router;
