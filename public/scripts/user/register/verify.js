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


		function startVerify (){

			$('.login-submit').click(function(){

				actionVerify()

			})
		}

		function actionVerify (){ //开始验证

			var userInfo = local.get('userInfo');

			var mobile = userInfo.mobile;

			var password = userInfo.password;

			var mobile_key = $.trim($('#mobile_key').val());

			var mobile_code = $.trim($('#mobile_code').val());

			if (!mobile_code) {

				Lizard.showToast('请输入验证码');

				return;
			}

			if (!/^\d{4}$/.test(mobile_code)) {

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
				},
				success: function (data) {

					Lizard.showToast('注册成功');

					local.remove('userInfo');

					setTimeout(function(){

						location.href = '/user/login';

					},1000)

				}
			})
		}

		startVerify();

	})
})
