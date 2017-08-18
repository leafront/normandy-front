var $ = require('../../lib/jquery');

var common = require('../../common');

var Vue = require('../../lib/vue');

var vueConfig = new Vue({

	el:'#app',

	data:  {
		"self": {
			"cohabitation": [],
			"know_loan": [],
			"income": [],
			"income_amount": "",
			"pending_amount": "",
			"pending_month": "",
			"phone_auth":  "",
			"other_liabilities": "",
			"liabilities_amount": "",
			"local_reg": "",
			"residence_time": "",
			"apply_amount": "",
			"apply_duration": "",
			"borrower_purpose": "",
			"payment_source": ""
		},
		"rel": {
			"liabilities_amount": "",
			"communication_barriers": "",
			"answer_status": "",
			"other_liabilities": "",
			"live_together": "",
			"know_loan": "",
			"redial": "",
			"agree_loan": ""
		},
		"col": {
			"know_position": "",
			"person": "",
			"seniority": "",
			"answer_status": "",
			"dial": "",
			"know_job": "",
			"know_legal": "",
			"redial": ""
		},
		"fri": {
			"gender": "",
			"contact_frequency": "",
			"answer_status": "",
			"know_loan": "",
			"redial": "",
			"same_city": ""
		},
		"emer": {
			"contact_frequency": "",
			"answer_status": "",
			"know_loan": "",
			"redial": "",
			"same_city": "",
			"gender": ""
		}

	},
	methods:{

		checkValue (propperty,type,value) {

			this[propperty][type] = value;

		}

	},

	mounted () {

		common.headerMenu();

		common.dropMenu();
	}
})
