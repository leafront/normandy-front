var lizard = require('../widget/lizard');

var common = require('../common');

var Vue = require('../lib/vue');

var vueConfig = new Vue ({
	el:'#app',
	data:{

		formData: {

			addresseeName: "",
			addresseeMobile: "",
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