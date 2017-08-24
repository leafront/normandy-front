
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var Vue = require('../lib/vue');

var vueConfig = new Vue({

	el:'#app',

	data:{
		params:{ no:'', name:'', status:'', type:'', amount:'', term:'', term_unit:'', from:'', to:'' }
	},

	mounted(){

		common.headerMenu();
	},
	methods: {

		accountAction (url) {

			Lizard.ajax({
				type: "POST",
				url:url,
				success(data) {

					if (data) {

						location.href = data.redirect_url;

					}

				}

			})
		}

	}
})
