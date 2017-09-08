var Lizard = require('../widget/lizard');

var common = require('../common');

var $ = require('../lib/jquery.min');

var Vue = require('../lib/vue');

var vueConfig = new Vue({
	el: '#app',
	methods: {

		download (id,shopId) {

			var jwt = Lizard.getCookie('jwt');

			var org_id = Lizard.getCookie('org_id');


			Lizard.ajax({
				type: 'POST',
				url:'/api/calculator/down',
				data: {id:id}
			}).then((data) =>{

				console.log(data);

			})

		}

	},
	mounted () {

		common.headerMenu();

	}
})

