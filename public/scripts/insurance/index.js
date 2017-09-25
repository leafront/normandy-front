var lizard = require('../widget/lizard');

var common = require('../common');

var Vue = require('../lib/vue');

var vueConfig = new Vue ({
	el:'#app',
	data:{

	},
	methods:{

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