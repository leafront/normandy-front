var $ = require('../../lib/jquery');

var lizard = require('../../widget/lizard');

var common = require('../../common');

var Page = require('../../widget/page');

Page({

	onShow (){

		common.headerMenu();

	},

	bindEvents () {

		this.showTab();

	},

	showTab(){

		$('.insurance_menu li').click(function(){

			var index = $(this).index();

			$(this).addClass('active').siblings().removeClass('active');

			$('.insurance_tab').eq(index).addClass('active').siblings('.insurance_tab').removeClass('active');

		})
	}

})