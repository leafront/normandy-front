/**
 * Created by leafrontye on 2017/7/21.
 */

require([
	'../config'
], function(){
	require([
		'jquery',
		'Lizard',
		'local'
	], function(
		$,
		Lizard,
		local
	){


		function startLogin (){


			$('.user-submit').click(function(){

				actionLogin()

			})

		}

		function actionLogin (){

			var mobile = $.trim($('#mobile').val());

			var password = $.trim($('#password').val());

			var captcha_code = $.trim($('#captcha_code').val());

			var captcha_key = $.trim($('#captcha_key').val());
			Lizard.ajax({
				type: 'POST',
				url: '/api/login',
				data: {
					mobile: mobile,
					password: password,
					captcha_code: captcha_code,
					captcha_key: captcha_key
				},
				success: function (data) {

					Lizard.showToast('登陆成功');

					local.set('jwt',data.jwt)
					setTimeout(function(){

						//location.href ='/';

					},2000)

				}
			})
		}

		function getVerify() {

			$('#captcha-img').click(function(){

				Lizard.ajax({
					type: 'POST',
					url: '/api/captcha',
					success: function (data) {

						$('#captcha-img').attr('src',data.img_url);

						$('#captcha_key').val(data.key);

					}
				})

			})
		}

		getVerify();
		startLogin();

	})

})
