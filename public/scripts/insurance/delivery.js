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
			addresseeProvince: "",
			addresseeCity: "",
			addresseeCounty: "",
			addresseeDetails: "",
			expressNo: "",
			deliveryType: "",

		}

	},
	methods:{

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

	}
})