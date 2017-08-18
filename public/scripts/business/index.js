
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var listTpl =  require('./templates/list');

var paginationTpl = require('../templates/pagination');

var pagination = require('../widget/pagination');

var Calendar = require('../widget/calendar');

var Page = require('../widget/page');

var data = require('../../../model/data');


const {
	termUnit,
	borrowingStatus,
	autoReviewStatus,
	phoneReviewStatus,
	borrowingType

} = data;

Page({

	onShow(){

		common.headerMenu();

		common.dropMenu();

		this.widgetCalendar();

	},

	widgetCalendar(){

		var fromTime = new Calendar({
			startYear: 2000,
			yearNum:5,
			ele:'#fromTime'
		})

		fromTime.showCalendar();

		var endTime = new Calendar({
			startYear: 2000,
			yearNum:5,
			ele:'#endTime'
		})

		endTime.showCalendar();

	},
	bindEvents(){

		pagination.showPage('/business/list',listTpl,{
			termUnit,
			borrowingStatus,
			autoReviewStatus,
			phoneReviewStatus,
			borrowingType
		});

		$('.js_reset').click(function(){

			common.clearForm();

			pagination.pageList('/business/list',null,listTpl,{
				termUnit,
				borrowingStatus,
				autoReviewStatus,
				phoneReviewStatus,
				borrowingType
			});

		})

		this.search();

	},

	search(){

		$('.js_query').click(function(){

			var businessNo = $.trim($('#businessNo').val());

			var userName = $.trim($('#userName').val());

			var term = $.trim($('#term').val());

			var amount = $.trim($('#amount').val());

			var termType = $.trim($('#termType').data('value'));

			var businessType = $.trim($('#businessType').data('value'));

			var businessStatus = $.trim($('#businessStatus').data('value'));

			var fromTime = $.trim($('#fromTime').val());

			var endTime = $.trim($('#endTime').val());

			var page = Lizard.query('page') || 1;

			var data = {
				page,
				no:businessNo,
				type:businessType,
				amount,
				term:term,
				term_unit:termType,
				status:businessStatus,
				name:userName,
				from:fromTime,
				to:endTime
			}

			data = common.deleteEmptyProperty(data);

			pagination.pageList('/business/list',data,listTpl,{
				termUnit,
				borrowingStatus,
				autoReviewStatus,
				phoneReviewStatus,
				borrowingType
			})

		})

	}
})


