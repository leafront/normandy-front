var $ = require('../lib/jquery.min');

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
				url: '/api/recharge',
				data:{
					amount: this.rechargeAmount,
					pay_method: '0'
				},
				error: () =>{

					this.saveBtn = false;
				}
			}).then((data) => {

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

			Lizard.ajax({
				type:'POST',
				url:'/api/withdrawal',
				dataType:'text',
				data:{
					amount: this.withdrawalAmount
				}
			}).then((data) => {

				var re = new RegExp(/<form [\s\S]*<\/form>/);

				var formStr = data.match(re)[0];

				$(formStr).insertAfter('#recharge');

				this.saveBtn = false;

				$('#form1').submit();

			})

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
				type: "GET",
				url:url
			}).then((data) => {

				if (data) {

					location.href = data.redirect_url;

				}
			})
		},
		showPopup (ele) {

			popup.showContent(ele);

		}
	}
})
