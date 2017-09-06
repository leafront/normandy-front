var $ = require('../../lib/jquery');

var common = require('../../common');

var Vue = require('../../lib/vue');

var vueConfig = new Vue({

	el:'#app',

	data: {
		formData:{
			rating:'',
			result:'',
			remark:''
		}

	},
	methods:{

		checkValue (property,value) {

			this.formData[property] = value;
		},

		cancelAction () {

			var bid = Lizard.query('bid');

			var status = Lizard.query('status');

			location.href = `/business/${borrowingsId}?bid=${bid}&status=${status}`;

		},
		submitAction () {

			var errorInfo = {rating:'请选择评分',result:'请选择结果',remark:'请填写备注'};

			var isValidate = true;

			for (var attr in this.formData) {

				var value = this.formData[attr];

				if (value === '') {

					Lizard.showToast(errorInfo[attr]);

					return;

				}
			}

			Lizard.ajax({
				type:'POST',
				url:`/api/borrowings/${borrowingsId}/approvals/master_review`,
				data:this.formData

			}).then((data) => {

				if (data) {

					Lizard.showToast('修改成功, 跳转至借款详情...');

					setTimeout(function(){

						location.href = '/business/' + window.borrowingsId;

					},500)
				}

			})
		}
	},

	mounted () {

		common.headerMenu();
	}
})



