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


		function startLogin (){

			$('#mobile').val('');

			$('#password').val('');


			$('.login-submit').click(function(){

				actionLogin()

			})
		}


		function authLogin(jwt) {

			var returnurl = Lizard.query('returnurl');

			if (returnurl) {
				$.ajax({
					url:'/user/auth/jwt',
					type:'POST',
					dataType:'json',
					headers: {
						Authorization: 'Bearer ' + jwt
					},
					success:function(data){
						if ( data.is_admin ) {
							local.set('jwt', jwt);
							Lizard.setCookie('jwt',jwt,1000 * 60 * 60 * 24 * 360 );
							Lizard.showToast('登录成功');
							local.set('user_id')
							setTimeout(function(){
								window.location.href = returnurl;
							},1000)

						} else {
							if ( data.results.length == 1) {
								if (data.results[0].id != undefined) {
									Lizard.setCookie('jwt',jwt,1000 * 60 * 60 * 24 * 360 );
									Lizard.setCookie('org_id',data.results[0].id,1000 * 60 * 60 * 24 * 360 );
									Lizard.showToast('登录成功');
									setTimeout(function(){
										window.location.href = returnurl;
									},1000)
								}
							}
						}
					}
				})
			} else {

				Lizard.showToast('登录成功');

				setTimeout(function(){
					window.location.href = '/';
				},1000)
			}


		}
		function actionLogin (){ //开始登录

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
				url: '/user/login',
				gateway:'gatewayExt',
				data: {
					mobile: mobile,
					password: password,
					captcha_code: captcha_code,
					captcha_key: captcha_key
				},
				success: function (data) {

					authLogin(data.jwt);

				},
				error: function(){

					common.updateVerify();

				}
			})
		}

		common.getVerify();

		startLogin();

	})
})
