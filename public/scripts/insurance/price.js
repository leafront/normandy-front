var lizard = require('../widget/lizard');

var $ = require('../lib/jquery');

var common = require('../common');

var Vue = require('../lib/vue');

var vueConfig = new Vue ({
	el:'#app',
	data:{

	},
	methods:{


	},
	computed:{


	},
	mounted () {

		common.headerMenu();

		$('.gps_error').hover(function(){

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
