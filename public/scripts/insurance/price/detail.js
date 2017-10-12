var lizard = require('../../widget/lizard');

var $ = require('../../lib/jquery');

var common = require('../../common');

var popup = require('../../widget/popup');

var Vue = require('../../lib/vue');

var vueConfig = new Vue ({
	el:'#app',
	data:{

	},
	methods:{

		infoAction () {

			location.href = '/insurance/info';

		},

		showPopup (ele) {

			popup.showContent(ele);

		}

	},
	computed:{


	},
	mounted () {

		common.headerMenu();

	}
})