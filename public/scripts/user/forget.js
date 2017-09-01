
var $ = require('../lib/jquery');

var common = require('../common');

var local = require('../widget/local');

var validate = require('../widget/validate');

var Lizard = require('../widget/lizard');


function startRestPass (){


	$('.login-submit').click(function(){

		actionForget()

	})
}

function actionForget (){ //开始验证用户

	var mobile = $.trim($('#mobile').val());

	var captcha_code = $.trim($('#captcha_code').val());

	var captcha_key = $.trim($('#captcha_key').val());

	if (!mobile) {

		Lizard.showToast('请输入手机号');

		return;
	}
	if (!validate.isMobile(mobile)) {

		Lizard.showToast('请输入正确的手机号');

		return;
	}


	if (!captcha_code) {

		Lizard.showToast('请输入验证码');

		return;
	}


	if (!validate.isVerify(captcha_code)) {

		Lizard.showToast('请输入正确的验证码');

		return;

	}

	Lizard.ajax({
		type: 'POST',
		url: '/api/reset/validator',
		gateway:'gatewayExt',
		data: {
			mobile: mobile,
			captcha_code: captcha_code,
			captcha_key: captcha_key
		},
		success: function (data) {

			local.set('mobile_hide',mobile);

			window.location.href = '/user/forget/' + data.key;
		},
		error:function(){

			common.updateVerify();

		}
	})
}

common.getVerify();

startRestPass();

