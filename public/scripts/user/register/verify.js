
var $ = require('../../lib/jquery');

var Lizard = require('../../widget/lizard');

var local = require('../../widget/local');

var validate = require('../../widget/validate');

var Page = require('../../widget/page');

Page({

	bindEvents(){

		$('.login-submit').click(() => {

			this.actionVerify()

		})
	},
	actionVerify (){ //开始验证

		var userInfo = local.get('userInfo');

		var mobile = userInfo.mobile;

		var password = userInfo.password;

		var mobile_key = $.trim($('#mobile_key').val());

		var mobile_code = $.trim($('#mobile_code').val());

		if (!mobile_code) {

			Lizard.showToast('请输入验证码');

			return;
		}

		if (!validate.isVerify(mobile_code)) {

			Lizard.showToast('请输入正确的短信验证码');

			return;
		}

		Lizard.ajax({
			type: 'POST',
			url: '/user/register',
			gateway:'gatewayExt',
			data: {
				mobile: mobile,
				password: password,
				mobile_code: mobile_code,
				mobile_key: mobile_key
			}
		}).then((data) => {


			Lizard.showToast('注册成功');

			local.remove('userInfo');

			setTimeout(() => {

				location.href = '/user/login';

			},1000)

		})
	}
})


