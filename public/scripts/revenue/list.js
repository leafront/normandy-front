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


			$.ajax({
				type: 'GET',
				url:'/api/calculator/down',
				contentType:'application/json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Authorization", 'Bearer ' + jwt);
					xhr.setRequestHeader('X-Org',org_id)
				},
				data: {
					id:id,
					shop_id:shopId

				},
				success (data) {

					console.log(data)

				}
			})

		}

	},
	mounted () {

		common.headerMenu();

	}
})

