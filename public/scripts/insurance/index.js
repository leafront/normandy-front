var Lizard = require('../widget/lizard');

var common = require('../common');

var Promise = require('es6-promise').Promise;

var Vue = require('../lib/vue');

var vueConfig = new Vue ({
	el:'#app',
	data:{

		province: [],
    cityList: []
	},

	created (){

		this.getProvince();

		this.getCity('310000');

	},
	methods:{

		/**
		 * 获取全国省份
		 */

		getProvince (){

			new Promise ((resolve,reject) =>{

				Lizard.ajax({
					type: 'POST',
					url: '/api/mdata/provinces'
				}).then((data) => {

					var results = data.data;

					if (data.status == 1 && results.length) {

						this.province = results;

						resolve(results)

					}

				})

			}).then((werer) => {

				console.log(werer);

			})



		},

		/**
		 * 获取某一个省份下的所有城市
		 * @param {String} provinceId
		 */

		getCity (provinceId){

			Lizard.ajax({
				type: 'POST',
				url: '/api/mdata/cities',
				data: {
					provinceCode: provinceId
				}
			}).then((data) => {

				var results = data.data;

				if (data.state == 1 && results.length) {

					this.cityList = results;

				}

			})

		},
		orderAction () {

			location.href = '/insurance/order';

		}

	},
	computed:{


	},
	mounted () {

		common.headerMenu();

	}
})