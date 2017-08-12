
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var listTpl =  require('./templates/list');

var paginationTpl = require('../templates/pagination');

var pagination = require('../widget/pagination');

var Page = require('../widget/page');

Page({

	onShow(){

		common.headerMenu();

	},
	bindEvents(){

		pagination.showPage('/borrowers/list',listTpl);

		$('.js_reset').click(function(){

			common.clearForm();

			pagination.pageList('/borrowers/list',null,listTpl);

		})

		this.search();

	},

	search(){

		$('.js_query').click(function(){

			var phone = $.trim($('#phone').val());

			var userName = $.trim($('#userName').val());

			var fromTime = $.trim($('#fromTime').val());

			var endTime = $.trim($('#endTime').val());

			if (phone && !Lizard.isMobile(phone)){

				Lizard.showToast('请输入正确的手机号');

				return;

			}

			var data = {
				mobile:phone,
				name:userName,
				from:fromTime,
				to:endTime
			}

			pagination.pageList('/borrowers/list',data,listTpl);

		})

	}
})


