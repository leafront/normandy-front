var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var validate = require('../widget/validate');

var local = require('../widget/local');

var verify = require('./widget/verify');

var Page = require('../widget/page');

Page({

	actionForget (){ //开始重置密码

		var mobile_code = $.trim($('#mobile_code').val());

		var password = $.trim($('#password').val());

		var repeat_password = $.trim($('#newPassword').val());

		var mobile_key = $.trim($('#mobile_key').val());

		var mobile_hide = local.get('mobile_hide');

		if (!mobile_code) {

			Lizard.showToast('请输入短信验证码');

			return;
		}
		if (!validate.isVerify(mobile_code)) {

			Lizard.showToast('请输入正确的短信验证码');

			return;
		}


		if (!password) {

			Lizard.showToast('请输入密码');

			return;
		}

		if (!validate.isPass(password)){

			Lizard.showToast('请输入8-20位包含字母的密码');
		}
		if (!repeat_password) {

			Lizard.showToast('请输入确认新密码');

			return;
		}

		if (!validate.isPass(repeat_password)){

			Lizard.showToast('请输入8-20位包含字母的密码');
		}

		if (repeat_password !== password ) {

			Lizard.showToast('两次输入密码不一致');

			return;

		}

		Lizard.ajax({
			type: 'POST',
			url: '/user/reset/password',
			data: {
				mobile_code: mobile_code,
				password: password,
				repeat_password:repeat_password,
				mobile_key: mobile_key,
				mobile_hide: mobile_hide
			},
			error (){

				verify.updateVerify();

			}
		}).then((data) => {

			local.remove('mobile_hide');

			Lizard.showToast('密码重置成功');

			setTimeout(function(){
				location.href = '/user/login';
			},1000)

		})
	},
	bindEvents () {

		$('.login-submit').click(() =>{

			this.actionForget();

		})

	}
})