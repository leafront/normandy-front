var $ = require('./lib/jquery');

var validate = require('./widget/validate');

var Lizard = require('./widget/lizard');

var Page = require('./widget/page');

Page ({
	bindEvents () {

		$('.login-submit').click(() =>{

			this.actionForget()

		})
	},
	actionForget (){ //开始验证用户

		var key = Lizard.query('key');

		var password = $.trim($('#password').val());


		if (!password) {

			Lizard.showToast('请输入密码');

			return;
		}

		if (!validate.isPass(password)) {

			Lizard.showToast('请输入8到64位包含字母密码');

			return;
		}

		if (key == null || key == "") {

			Lizard.showToast('激活失败');

			return;

		}

		Lizard.ajax({
			type: 'POST',
			url: '/user/activate',
			data:{
				key,
				password:password
			}
		}).then((data) => {

			Lizard.setCookie('jwt',data.jwt,1000 * 60 * 60 * 24 * 360 );

			Lizard.showToast('激活成功');

			setTimeout(() => {

				location.href = '/'

			},500)
		})
	}

})

