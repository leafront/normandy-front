var Lizard = require('../widget/lizard');

var common = require('../common');

var Vue =  require('../lib/vue');

var local = require('../widget/local');

var vueConfig = new Vue ({

	el:'#app',
	data:{
		list:[]
	},

	created () {

		var formData = local.get('revenue_formData');

		this.reportList(formData)


	},
	methods:{

		reportList (formData) {

			Lizard.ajax({
				type:'POST',
				url:'/api/calculator/cal_and_get_view',
				data:JSON.stringify(formData),
				headers:{
					'Content-type':'application/json'
				}
			}).then((data) => {

				if (data) {

					this.list = data.display_view;

				}

			})

		},
		saveCalc () {

			var formData = local.get('revenue_formData');

			Lizard.ajax({
				type:'POST',
				url:'/api/calculator/calculation',
				data:JSON.stringify(formData),
				headers:{
					'Content-type':'application/json'
				}
			}).then((data) => {

				if (data) {

					Lizard.showToast('报表保存成功');

					setTimeout(() => {

						location.href = '/revenue/list';

					},500)

				}

			})

		}
	},

	updated () {


		var revenueList = document.querySelectorAll('.revenue_list span');

		var revenueLen = revenueList.length;

		document.querySelector('.cont_list').style.width = ((40 + revenueLen * 115) / 100 ) + 'rem';


		common.headerMenu();


	}
})

