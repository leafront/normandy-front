var Lizard = require('../widget/lizard');

var common = require('../common');

var Vue = require('../lib/vue');

let licenseNo = Lizard.query('licenseNo');

licenseNo = decodeURIComponent(window.atob(licenseNo));

var vueConfig = new Vue ({
	el: '#app',
	data: {

		formData: {
			engineNo: "",
			firstRegisterDate: "",
			frameNo: "",
			licenseNo: ""

		}

	},

	created () {

		this.getLicenseInfo(licenseNo);

	},
	methods:{

		/**
		 * 获取车牌号查询车辆信息
		 * @ param {String} licenseNo
		 */

		getLicenseInfo (licenseNo) {

			Lizard.ajax({
				type: 'POST',
				url: '/api/auto/vehicleAndModel',
				data: {
					licenseNo
				}
			}).then((data) => {

				let results = data.data;

				if (data.state == 1 && results) {

					const {
						engineNo,
						firstRegisterDate,
						frameNo,
						licenseNo
					} = results;

					this.formData.engineNo = engineNo;

					this.formData.firstRegisterDate = firstRegisterDate;

				  this.formData.frameNo = frameNo;

				  this.formData.licenseNo = licenseNo;

				}

			})

		}

	},
	computed:{


	},
	mounted () {

		common.headerMenu();

	}
})
