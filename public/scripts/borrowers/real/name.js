
var common = require('../../common');

var Lizard = require('../../widget/lizard');

var validate = require('../../widget/validate');


var Vue = require('../../lib/vue');


var vueConfig = new Vue({

	el: '#app',
	data: {

		params: {
			id_no: '',
			name:''
		}
	},

	mounted () {

		common.headerMenu();

	},
	methods: {

		bindBorrowers(){

			const { name, id_no } = this.params;

			const mobile = Lizard.query('mobile');

			if (!name) {

				Lizard.showToast('请输入姓名');

				return;
			}

			if (!validate.isName(name)) {

				Lizard.showToast('请输入正确的姓名');

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

			var data = {
				name,
				mobile,
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
				url:'/api/borrowers/real-name',
				data:data
			}).then((results) => {


				Lizard.showToast('添加成功');

				setTimeout(() =>{

					location.href = '/borrowers';

				},500)
			})
		}
	}
})

