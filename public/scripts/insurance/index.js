var Lizard = require('../widget/lizard');

var common = require('../common');

var Promise = require('es6-promise').Promise;

var Vue = require('../lib/vue');

var validate = require('../widget/validate');

const licensePlate = ["京","津","沪","渝","鲁","苏","黑","豫","粤","蒙", "辽","冀","琼","桂","湘","浙","贵","川","青","云", "陕","鄂","吉","新","浙","辽","甘","皖","赣","闽", "蒙","闽","宁","藏","晋"]

var vueConfig = new Vue ({
	el:'#app',
	data:{

		province: [],
		licensePlate: licensePlate,
		licenseNumber: '',
    cityList: [],
		dropMenu: -1,
		licenseName: '请选择',
		ownerName: '',
		provinceCode: '',
		provinceName: '请选择',
		cityName: '请选择'
	},

	created (){

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

					this.provinceName = results[0].provinceName;

					this.provinceCode = results[0].provinceCode;

					return results;

				}

			}).then((data) => {

				this.getCity(data[0].provinceCode);


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

				var cityList = [];

				if (data.state == 1 && results.length) {


					results.forEach((item) => {

						cityList.push({
							cityCode:item.cityCode,
							cityName: item.cityName,
							cityPlate: item.cityPlate
						})

					})

					this.cityList = cityList;

					this.cityName = results[0].cityName;

					this.licenseName = results[0].cityPlate.slice(0,1);

					this.licenseNumber = results[0].cityPlate.slice(1);

				}

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

			this.provinceName = item.provinceName;

			this.provinceCode = item.provinceCode;

			this.getCity(item.provinceCode);

		},

		/**
		 * @param {Object} item
		 */
		selectCity (item) {

			this.cityName = item.cityName;

			this.licenseNumber = item.cityPlate.slice(1);

		},

		/**
		 * @param {String} item
		 */

		selectLicense (item) {

			this.licenseName = item;

		},

		orderAction () {

			location.href = '/insurance/order';

		},
		actionInfo () {

			const licenseNumber = this.licenseNumber;

			const licenseName = this.licenseName;

			const ownerName = this.ownerName;

			let license = licenseName + licenseNumber;

			if (!licenseNumber) {

				Lizard.showToast('请输入车牌号');

				return;

			}


			if (!validate.isCarNumber(license)) {

				Lizard.showToast('请输入正确的车牌号码');

				return;

			}

			if (!ownerName) {

				Lizard.showToast('请输入车主姓名');

				return;

			}

			Lizard.showToast('获取立即报价成功,跳转至详细车辆信息...');

			license =  window.btoa(encodeURIComponent(license));

			setTimeout(() => {

				location.href = `/insurance/info?licenseNo=${license}`;

			},500)

		}

	},
	mounted () {

		common.headerMenu();

		common.dropMenu.call(this);

	}
})