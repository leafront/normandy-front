var common = require('../../common');

var Lizard = require('../../widget/lizard');

var Vue = require('../../lib/vue');

var vueConfig = new Vue({

	el: '#app',

	data: {

		params: {

			password: '',
			new_password: '',
			repeat_new_password: ''
		}

	},

	methods: {

		cancelModifyPass () {

			location.href = '/borrowers';

		},

		submitModifyPass (){

			const formData = Object.assign({},this.params);

			const { password, new_password, repeat_new_password } = formData;

			if (!password) {

				Lizard.showToast('请输入原密码');

				return;
			}

			if (!new_password) {

				Lizard.showToast('请输入新密码');

				return;
			}


			if (!repeat_new_password) {

				Lizard.showToast('请输入确认新密码');

				return;
			}

			if (repeat_new_password !== new_password) {

				Lizard.showToast('两次密码输入不一致');

				return;
			}


			Lizard.ajax({
				type:'POST',
				url:'/api/modify',
				data:formData
			})
			.then((results) => {

				if (results) {

					Lizard.showToast('修改成功');

					setTimeout(() => {

						location.href = '/borrowers';

					},500)

				}

			})
		}

	}

})