
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var popup = require('../widget/popup');

var Vue = require('../lib/vue');


var recharge = new Vue({

	el: '#rechargePopup',

	data: {

		saveBtn:false,
		rechargeAmount:'',
		sinaPayLink:'',
		formData: {}
	},
	methods: {
		hidePopup () {

			popup.hideContent('#rechargePopup');


		},
		saveRecharge(){

			this.saveBtn = true;

			Lizard.ajax({
				type: "POST",
				url: '/account/recharge',
				data:{
					amount: this.rechargeAmount,
					pay_method: '0'
				},
				success:(data) => {

					this.rechargeAmount = '';

					popup.hideContent('#rechargePopup');

					var formData = {}

					Object.keys(data).forEach((item) =>{

						if (item !== 'sina_pay_online_pay_gate') {

							formData[item] = data[item];

						}

					})

					this.formData = formData;

					this.sinaPayLink = data.sina_pay_online_pay_gate;

					Vue.nextTick( ()=>{

						$('#recharge').submit();

					})


				},
				error: () =>{

					this.saveBtn = false;
				}
			})
		}

	}
})

var cashPopup = new Vue({

	el: '#cashPopup',

	data: {

		saveBtn:false,
		withdrawalAmount:''
	},
	methods: {

		hidePopup () {

			popup.hideContent('#cashPopup');


		},
		saveRecharge(){

			$('#cashForm').submit();
		}

	}
})


var vueConfig = new Vue({

	el:'#app',

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
		},
		showPopup (ele) {

			popup.showContent(ele);

		}
	}
})
