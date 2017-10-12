var Lizard = require('../widget/lizard');

var common = require('../common');

var Vue = require('../lib/vue');

var vueConfig = new Vue({
	el: '#app',
	methods: {

		download (id,shopId) {

			Lizard.ajax({
				type: 'POST',
				url:'/api/calculator/down',
				data: {id:id}
			}).then((data) =>{

				const token = data.token;

				if (data && data.token) {

					location.href = `/api/calculator/down?id=${id}&token=${token}`;

				} else {

					this.download(id,shopId);

				}

			}).catch((err) => {

				this.download(id,shopId);

			})

		}

	},
	mounted () {

		common.headerMenu();

	}
})

