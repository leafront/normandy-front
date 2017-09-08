var Lizard = require('../widget/lizard');

var common = require('../common');

var Vue =  require('../lib/vue');

var local = require('../widget/local');

var vueConfig = new Vue ({

	el:'#app',
	data:{
		list:[],
		listTit: [],
		totalPay: '',
		totalIncome:''
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

					var list = data.display_view;

					let listTit = [];

					let results = [];

					for (let attr in list[0]){

						listTit.push(attr);

					}


					for (let i = 0,len = list.length -1; i <len; i++) {

						var value = [];

						for (let attr in list[i]){

							value.push(list[i][attr]);

						}

						results[i] = value;

					}


					const totalPay = list[list.length - 1]['总收入'];

					const totalIncome = list[list.length - 1]['总支出'];

					this.list = results;

					this.listTit = listTit;

					this.totalPay = totalPay;

					this.totalIncome = totalIncome;

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

		document.querySelector('.cont_list').style.width = ((40 + revenueLen * 150) / 100 ) + 'rem';


		common.headerMenu();


	}
})

