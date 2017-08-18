
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var validate = require('../widget/validate');

var local = require('../widget/local');

var Page = require('../widget/page');


Page({
	bindEvents(){

		$('.login-submit').click(() =>{

			this.actionLogin();

		})

	},
	onShow () {

		common.getVerify();
	},
	actionLogin (){ //开始登录

		var mobile = $.trim($('#mobile').val());

		var password = $.trim($('#password').val());

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

		if (!password) {

			Lizard.showToast('请输入密码');

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

		var data = {
			mobile: mobile,
			password: password,
			captcha_code: captcha_code,
			captcha_key: captcha_key
		}

		this.userLogin(data);

	},

	userLogin(data){

		Lizard.ajax({
			type: 'POST',
			url: '/user/login',
			gateway:'gatewayExt',
			data: data,
			success: (data) =>{

				this.authLogin(data.jwt);

			},
			error(){

				common.updateVerify();

			}
		})
	},
	loginSuccess (data,jwt,returnurl){ //登录成功跳转

		if ( data.is_admin ) {

			local.set('jwt', jwt);

			Lizard.setCookie('jwt',jwt,1000 * 60 * 60 * 24 * 360 );

			Lizard.showToast('登录成功');

			setTimeout(() => {

				window.location.href = returnurl;

			},100)

		} else {

			if ( data.results.length == 1) {

				if (data.results[0].id != undefined) {

					Lizard.setCookie('jwt',jwt,1000 * 60 * 60 * 24 * 360 );

					Lizard.setCookie('org_id',data.results[0].id,1000 * 60 * 60 * 24 * 360 );

					Lizard.showToast('登录成功');

					setTimeout(() =>{

						window.location.href = returnurl;

					},100)
				}
			} else {

				Lizard.showToast('登录失败');

			}
		}
	},
	authLogin (jwt) { //jwt 认证

		var returnurl = Lizard.query('returnurl') || '/';

		$.ajax({
			url:'/user/auth/jwt',
			type:'POST',
			dataType:'json',
			headers: {
				Authorization: 'Bearer ' + jwt
			},
			success:(data) =>{

				this.loginSuccess(data,jwt,returnurl);
			},
			error (error){

				var msg = JSON.parse(error.responseText);

				Lizard.showToast(msg.error.message);

			}
		})
	}
})


