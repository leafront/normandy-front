
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
			id_no: ''
		}

	},
	methods: {

		cancelBorrowers () {

			location.href = '/borrowers';

		},

		addBorrowers(){

			const formData = Object.assign({},this.params);

			const { name, mobile, id_no } = formData;

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


			if (!id_no) {

				Lizard.showToast('请输入身份证号');

				return;

			}

			if (!validate.isIdCard(id_no)){

				Lizard.showToast('请输入正确的身份证号');

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

				Lizard.showToast('新增成功, 跳转至绑定页面...');

				setTimeout(() =>{

					location.href = '/borrowers/bind';

				},500)
			})
		}

	},
	mounted () {

		common.headerMenu();

	}
})


