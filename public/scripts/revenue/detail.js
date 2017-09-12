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
		download (id,shopId) {

			Lizard.ajax({
				type: 'POST',
				url:'/api/calculator/down',
				data: {id:id}
			}).then((data) =>{

				const token = data.token;

				if (data && data.token) {

					location.href = `/api/calculator/down?id=${id}&token=${token}`;

				} else {

					this.download(id,shopId);

				}

			}).catch((err) => {

				this.download(id,shopId);

			})

		}
	},

	mounted () {


		var revenueList = document.querySelectorAll('.revenue_list span');

		var revenueLen = revenueList.length;

		document.querySelector('.cont_list').style.width = ((40 + revenueLen * 150) / 100 ) + 'rem';


		common.headerMenu();


	}
})

