var router = require('koa-router')();

var common = require('../../model/common');

var baseModel = require('../../model/baseModel');

var data = require('../../model/data');

const {

	termUnit,
	repaymentType

} = data;

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('revenue/index',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})

router.get('/report', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})
	await ctx.render('revenue/report',{
		pathName: ctx.path,
		authority,
		shop,
		roleList
	})

})


router.get('/list', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const {items: list } = await baseModel.get(ctx,{
		url:'/api/calculator/calculation',
		data:{
			shop_id:shop.id
		}
	})

	await ctx.render('revenue/list',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		list,
		shopId:shop.id,
		termUnit,
		repaymentType
	})

})

router.get('/:id', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const id = ctx.params.id;

	const {display_view: list } = await baseModel.get(ctx,{
		url:'/api/calculator/cal_and_get_view',
		data:{
			id:id
		}
	})

	let listTit = [];

	let results = [];

	for (let attr in list[0]){

		listTit.push(attr);

	}


	for (let i = 0,len = list.length -1; i <len; i++) {

		var value = [];

		for (let attr in list[i]){

			value.push(list[i][attr]);

		}

		results[i] = value;

	}


	const totalPay = list[list.length - 1]['总收入'];

	const totalIncome = list[list.length - 1]['总支出'];

	await ctx.render('revenue/detail',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		listTit,
		results,
		totalPay,
		detailId:id,
		shopId:shop.id,
		totalIncome
	})

})

module.exports = router;
