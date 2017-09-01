
var $ = require('../../../lib/jquery');

var common = require('../../../common');

var baseData = require('../../../../../model/data');

var Lizard = require('../../../widget/lizard');

var Page = require('../../../widget/page');

const {
	condition,
	surfaceStatus,
	purchaseType,
	collateralLastFree,
	certificateType,
	starterStatus,
	engineStatus,
	transmissionStatus,
	exhaustStatus,
	isWorkOk

	} = baseData

Page({

	onShow(){

		common.headerMenu();

	},
	bindEvents(){

		$('.vehicle_cont').on('click','.vehicle_item_drop',function(){

			$(this).toggleClass('active');

			$(this).next().toggleClass('active').siblings('.vehicle_tab').removeClass('active');

		})
	}
})



