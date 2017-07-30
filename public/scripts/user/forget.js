/**
 * Created by leafrontye on 2017/7/28.
 */
/**
 * Created by leafrontye on 2017/7/21.
 */

require([
	'../config'
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
			if (!Lizard.isMobile(mobile)) {

				Lizard.showToast('请输入正确的手机号');

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

	})
})
