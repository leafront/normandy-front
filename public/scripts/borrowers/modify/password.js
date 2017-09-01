var $ = require('../../lib/jquery');

var common = require('../../common');

var Lizard = require('../../widget/lizard');

var Page = require('../../widget/page');


Page({

	onShow(){

		common.headerMenu();
	},

	bindEvents(){

		$('.js_submit').click(() =>{

			this.submitModifyPass();

		})


		$('.js_cancel').click(() =>{

			location.href = '/borrowers';
		})

	},
	submitModifyPass (){

		var password = $.trim($('#password').val());

		var new_password = $.trim($('#new_password').val());

		var repeat_new_password = $.trim($('#repeat_new_password').val());

		if (!password) {

			Lizard.showToast('请输入原密码');

			return;
		}

		if (!new_password) {

			Lizard.showToast('请输入新密码');

			return;
		}


		if (!repeat_new_password) {

			Lizard.showToast('请输入确认新密码');

			return;
		}

		if (repeat_new_password !== new_password) {

			Lizard.showToast('两次密码输入不一致');

			return;
		}


		Lizard.ajax({
			type:'POST',
			url:'/api/modify',
			data:{
				password: password,
				new_password: new_password,
				repeat_new_password: repeat_new_password
			},
			success:function(){

				location.href = '/borrowers';

			}
		})
	}
})
