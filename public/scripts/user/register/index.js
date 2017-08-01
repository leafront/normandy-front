/**
 * Created by leafrontye on 2017/7/28.
 */


require([
	'../../config'
], function(){
	require([
		'jquery',
		'Lizard',
		'local',
		'common'
	], function(
		$,
		Lizard,
		local,
		common
	){


		function startRegister (){

			$('#mobile').val('');

			$('#password').val('');


			$('.login-submit').click(function(){

				actionRegister()

			})
		}

		function actionRegister (){ //开始注册

			var mobile = $.trim($('#mobile').val());

			var password = $.trim($('#password').val());

			var captcha_code = $.trim($('#captcha_code').val());

			var captcha_key = $.trim($('#captcha_key').val());


			if (!mobile) {

				Lizard.showToast('请输入手机号');

				return;
			}
			if (!Lizard.isMobile(mobile)) {

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


			if (!Lizard.isVerify(captcha_code)) {

				Lizard.showToast('请输入正确的验证码');

				return;

			}

			Lizard.ajax({
				type: 'POST',
				url: '/user/register/mobile',
				gateway:'gatewayExt',
				data: {
					mobile: mobile,
					password: password,
					captcha_code: captcha_code,
					captcha_key: captcha_key
				},
				success: function (data) {

					local.set('userInfo',{
						mobile:mobile,
						password:password,
						mobile_key:data.key
					})
					location.href = '/user/register/' + data.key;

				},
				error: function(){

					common.updateVerify();

				}
			})
		}

		common.getVerify();

		startRegister();

	})
})
