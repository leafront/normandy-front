
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

	colorList

} = data;

Page({

	onShow(){

		common.headerMenu();

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

		pagination.showPage('/vehicles/list',listTpl,{colorList});

		$('.js_reset').click(function(){

			common.clearForm();

			pagination.pageList('/vehicles/list',null,listTpl,{colorList});

		})

		this.search();

	},

	search(){

		$('.js_query').click(function(){

			var vin = $.trim($('#vin').val());

			var userName = $.trim($('#userName').val());

			var fromTime = $.trim($('#fromTime').val());

			var endTime = $.trim($('#endTime').val());

			var page = Lizard.query('page') || 1;

			var data = {
				page,
				vin:vin,
				name:userName,
				from:fromTime,
				to:endTime
			}

			pagination.pageList('/vehicles/list',data,listTpl,{colorList});

		})

	}
})
