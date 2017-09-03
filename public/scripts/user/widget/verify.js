
var Lizard = require('../../widget/lizard');

var verify = {

	updateVerify: function(){
		Lizard.ajax({
			type: 'POST',
			url: '/user/verify'
		})
		.then((data) => {

			console.log(data);

			document.getElementById('captcha-img').setAttribute('src',data.img_url);

			document.getElementById('captcha_key').value = data.key;

		})
	},
	getVerify: function () { //获取验证码

		document.getElementById('captcha-img').addEventListener('click',() => {

			this.updateVerify();

		})

	}
}

module.exports = verify;
