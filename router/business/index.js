/**
 * Created by leafrontye on 2017/7/28.
 */

var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

var common = require('../../model/common');

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})

	const { results: businessList} = await baseModel.get(ctx,{
		url:'/api/borrowings',
		page:1
	})

	const borrowingType = ['抵押借款', '质押借款', '库存融资']

	const termUnit = ['天', '个月'];

	const borrowingStatus = {
		'0': {'title': '待初审', 'color': 'business_status_txt3'},
		'1': {'title': '待主审', 'color': 'business_status_txt1'},
		'-1': {'title': '初审拒绝', 'color':'business_status_txt4'},
		'2': {'title': '待财审', 'color': 'business_status_txt1',},
		'-2': {'title': '主审拒绝', 'color': 'business_status_txt4'},
		'3': {'title': '待复审', 'color': 'business_status_txt2'},
		'-3': {'title': '财审拒绝', 'color': 'business_status_txt4'},
		'4': {'title': '还款中', 'color': 'business_status_txt'},
		'-4': {'title': '复审拒绝', 'color': 'business_status_tx4'},
		'5': {'title': '还款完成', 'color': 'business_status_txt'},
		'-5': {'title': '坏账', 'color': 'business_status_tx4'}
	}
	const autoReviewStatus = {
		0: {'title': '已创建机审', 'color': 'business_status_txt3'},
		1: {'title': '正在机审', 'color': 'business_status_txt1'},
		2: {'title': '机审通过', 'color': 'business_status_txt2'},
		3: {'title': '机审拒绝', 'color': 'business_status_txt4'}
	}

	const phoneReviewStatus = {
		0: {'title': '等待电核', 'color': 'business_status_txt3'},
		1: {'title': '电核完成', 'color': 'business_status_txt2'}
	}
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

module.exports = router;
