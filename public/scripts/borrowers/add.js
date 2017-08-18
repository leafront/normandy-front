var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var validate = require('../widget/validate');

var Page = require('../widget/page');


Page({

	onShow(){

		common.headerMenu();

	},
	bindEvents(){

		$('.js_submit').click(() =>{

			this.addBorrowers();

		})
	},
	addBorrowers(){

		var borrowers_name = $.trim($('#borrowers_name').val());

		var phone = $.trim($('#borrowers_phone').val());

		var email = $.trim($('#borrowers_email').val());

		if (!borrowers_name) {

			Lizard.showToast('请输入姓名');

			return;
		}

		if (!phone) {

			Lizard.showToast('请输入手机号');

			return;
		}

		if (!validate.isMobile(phone)) {

			Lizard.showToast('请输入手机号');

			return;
		}

		if (email && !validate.isEmail(email)){

			Lizard.showToast('请输入正确的邮箱地址');

		}
		var data = {
			name: borrowers_name,
			phone: phone,
			email: email
		}

		this.borrowersSubmit(data);

	},
	borrowersSubmit(data){
		Lizard.ajax({
			type:'POST',
			url:'/borrowers/bind',
			data:data,
			success:function(){

				Lizard.showToast('添加成功');

				setTimeout(() =>{

					//location.href = '/borrowers';

				},500)

			}
		})
	}
})
