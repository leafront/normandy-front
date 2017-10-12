var Lizard = require('../widget/lizard');

var common = require('../common');

var validate = require('../widget/validate');

var Vue = require('../lib/vue');

var vueConfig = new Vue ({
	el:'#app',
	data:{

		formData: {

			addresseeName: "",
			addresseeMobile: "",
			addresseeEmail: "",
			addresseeProvince: "请选择省份",
			addresseeCity: "请选择城市",
			addresseeCounty: "请选择区县",
			addresseeDetails: "",
			expressNo: "",
			deliveryType: "",

		},
		dropMenu: -1,
		province: [],
		cityList: [],
		countyList: []
	},

	created () {

		this.getProvince();

	},
	methods:{

		/**
		 * 获取全国省份
		 */

		getProvince (){
			Lizard.ajax({
				type: 'POST',
				url: '/api/mdata/provinces'
			}).then((data) => {

				var results = data.data;

				if (data.state == 1 && results.length) {

					this.province = results;

					this.formData.addresseeProvince = results[0].provinceName;

					//this.provinceCode = results[0].provinceCode;

					return results;

				}

			}).then((results) => {

				this.getCity(results[0].provinceCode);


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

					this.formData.addresseeCity = results[0].cityName;

					return results[0].countyList;

				//	this.cityCode = results[0].cityCode;

				}

			}).then((results) => {

				this.formData.addresseeCounty = results[0].countyName;

				this.countyList = results;

			})
		},

		/**
		 * @param {Number} value
		 *
		 */

		selectMenu (value) {

			if (this.dropMenu == value) {

				this.dropMenu = -1;

			} else {

				this.dropMenu = value;

			}
		},


		/**
		 * @pram {Object} item
		 *
		 */

		selectProvince (item) {

			this.formData.addresseeProvince = item.provinceName;

			this.getCity(item.provinceCode);

		},

		/**
		 * @param {Object} item
		 */
		selectCity (item) {

			this.formData.addresseeCity = item.cityName;

		},

		/**
		 * @param {Object} item
		 */

		selectCounty (item) {

			this.formData.addresseeCounty = item.countyName;

		},

		submitDelivery () {

			const {
				addresseeName,
				addresseeMobile,
				addresseeEmail,
				addresseeDetails
			} = this.formData;

			if (!addresseeName) {

				Lizard.showToast('请输入收件人姓名');

				return;

			}

			if (!addresseeMobile) {

				Lizard.showToast('请输入收件人手机号');

				return;

			}

			if (!validate.isMobile(addresseeMobile)) {

				Lizard.showToast('请输入正确的收件人手机号');

				return;

			}

			if (!addresseeEmail) {

				Lizard.showToast('请输入收件人电子邮箱');

				return;

			}

			if (!validate.isEmail(addresseeEmail)) {

				Lizard.showToast('请输入正确的收件人电子邮箱');

				return;

			}

			if (!addresseeDetails) {

				Lizard.showToast('请输入收件人地址');

				return;

			}


		},

		orderAction (){

			location.href = '/insurance/order';

		}

	},
	computed:{


	},
	mounted () {

		common.headerMenu();

		common.dropMenu.call(this);

	}
})