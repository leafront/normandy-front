
var common = require('../common');

var Lizard = require('../widget/lizard');

var validate = require('../widget/validate');


var Vue = require('../lib/vue');


var vueConfig = new Vue({

	el: '#app',
	data: {

		params: {
			id_no: ''
		}
	},

	mounted () {

		common.headerMenu();

	},
	methods: {

		bindBorrowers(){

			var id_no = this.params.id_no;

			if (!id_no) {

				Lizard.showToast('请输入身份证号');

				return;

			}

			if (!validate.isIdCard(id_no)){

				Lizard.showToast('请输入正确的身份证号');

				return;

			}

			var data = {
				id_no
			}

			this.borrowersSubmit(data);

		},

		cancelBorrowers () {

			location.href = '/borrowers';

		},
		borrowersSubmit(data){
			Lizard.ajax({
				type:'POST',
				url:'/api/borrowers',
				data:data
			}).then((results) => {


				Lizard.showToast('绑定成功, 跳转至用户列表...');

				setTimeout(() =>{

					location.href = '/borrowers';

				},500)
			})
		}
	}
})




