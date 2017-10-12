var Lizard = require('../../widget/lizard');

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
	created () {


	},
	mounted () {

		common.headerMenu();

		$('.price_error').hover(function(){

			setTimeout(() =>{

				$(this).next('.price_tips').addClass('active');

			},200)

		},function(){

			setTimeout(() =>{

				$(this).next('.price_tips').removeClass('active');

			},200)

		})

	}
})

var seeInsurance = new Vue ({

	el:'#seeInsurance',

	methods:{

		hidePopup (ele) {

			popup.hideContent(ele);

		}
	}
})

var editInsurance = new Vue ({
	el: '#editInsurance',

	methods: {

		hidePopup (ele) {

			popup.hideContent(ele);

		}
	}
})
