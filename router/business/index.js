
var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

var data = require('../../model/data');

const {

	mobileEncrypt,
	idCardEncrypt
} = common;

const {
	borrowingType,
	termUnit,
	borrowingStatus,
	autoReviewStatus,
	phoneReviewStatus,
	nullBooleanOptions,
	interiorStatus,
	surfaceStatus,
	shiftingType,
	driverType,
	collateralLastFree,
	repaymentType,
	purchaseType,
	maritalStatus,
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

	const { results: businessList} = await baseModel.get(ctx,{
		url:'/api/borrowings',
		page:1
	})

	await ctx.render('business/index',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		businessList,
		borrowingType,
		termUnit,
		borrowingStatus,
		autoReviewStatus,
		phoneReviewStatus
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

	const condition = conditionList.results[0];

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
			type: 'violation_records',
			name: '违章资料'
		},
		{
			type: 'supporting_pics',
			name: '三方证明资料'
		}
	];

	const vehicle = business.application.vehicle;

	await ctx.render('business/detail',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
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
		nullBooleanOptions,
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
		condition,
		vehicle
	})

})


router.post('/approvals',async (ctx,next) => {

	const { id } = ctx.request.body;

	await baseModel.get(ctx,{
		url:`/api/borrowings/${id}/approvals`,
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


router.post('/risks',async (ctx,next) => {

	const { id } = ctx.request.body;

	await baseModel.get(ctx,{
		url:`/api/borrowings/${id}/risks`,
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})

router.post('/vehicles/risks',async (ctx,next) => {

	const { id } = ctx.request.body;

	await baseModel.get(ctx,{
		url:`/api/borrowings/${id}/vehicles/risks`,
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})



module.exports = router;
