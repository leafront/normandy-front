
var common = require('../common');

var Lizard = require('../widget/lizard');

var validate = require('../widget/validate');

var Vue = require('../lib/vue');


var vueConfig = new Vue ({

	el: '#app',

	data: {
		params: {
			name: '',
			mobile: '',
			email: ''
		}

	},
	methods: {

		cancelBorrowers () {

			location.href = '/borrowers';

		},

		addBorrowers(){

			const formData = Object.assign({},this.params);

			const { name, mobile, email } = formData;

			if (!name) {

				Lizard.showToast('请输入姓名');

				return;
			}

			if (!mobile) {

				Lizard.showToast('请输入手机号');

				return;
			}

			if (!validate.isMobile(mobile)) {

				Lizard.showToast('请输入正确的手机号');

				return;
			}

			if (email && !validate.isEmail(email)){

				Lizard.showToast('请输入正确的邮箱地址');

				return;

			}

			this.borrowersSubmit(formData);

		},

		borrowersSubmit (data){

			Lizard.ajax({
				type:'POST',
				url:'/api/user-bind-borrower',
				data: data
			}).then((data) => {

				Lizard.showToast('新增成功, 跳转至实名认证页面...');

				setTimeout(() =>{

					location.href = `/borrowers/real/name?mobile=${data.mobile}`;

				},500)
			})
		}

	},
	mounted () {

		common.headerMenu();

	}
})


