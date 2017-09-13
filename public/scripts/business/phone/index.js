var $ = require('../../lib/jquery');

var common = require('../../common');

var Vue = require('../../lib/vue');

var local = require('../../widget/local');

var social_net = local.get('social_net');

function dropMenu () {

	$('.js_select').click(function(e){

		e.stopPropagation();


		$(this).toggleClass('active');

		$(this).parent('.drop_menu').toggleClass('active');

	})

	$('.drop_menu_list').on('click','li',function(e){

		e.stopPropagation();

		var value = $(this).data('value');

		$(this).parent().prev('.js_select').text($(this).text()).data('value',value).addClass('active').parents('.drop_menu').removeClass('active');

	})

	$(document).click(function(){

		$('.drop_menu').removeClass('active');

	})
}


const {
	emergencyContacts,
	relatives,
	friends,
	colleagues,
} = social_net;


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
			"person": "",
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
			"company_scale":"",
			"dial": "",
			"know_job": "",
			"know_legal": "",
			"redial": ""
		},
		"fri": {
			"person": "",
			"gender": "",
			"contact_frequency": "",
			"answer_status": "",
			"know_loan": "",
			"redial": "",
			"person":"",
			"same_city": ""
		},
		"emer": {
			"person": "",
			"contact_frequency": "",
			"answer_status": "",
			"know_loan": "",
			"redial": "",
			"same_city": "",
			"gender": ""
		},
		emergencyContacts,
		relatives,
		friends,
		colleagues,
		isValidate: true

	},
	methods:{

		selectMenu (index) {

			var dropMenu  = this.dropMenu;

			if (dropMenu == index) {

				this.dropMenu = -1;

			} else {

				this.dropMenu = index;
			}

		},

		checkValue (property,type,value) {

			this[property][type] = value;

		},
		validateForm(formData){

			var isValidate = true;

			var validateEle = ['self','rel','col','fri','emer'];

			for (var i = 0,len = validateEle.length; i < len; i++) {

				var formData = this[validateEle[i]];

				for (var attr in formData ) {

					var value =  formData[attr];

					if (typeof value !== "object") {

						if (value === '') {

							console.log(attr)

							isValidate = false;

							return isValidate;

						}

					} else {

						if (!value.length) {

							console.log(attr)

							isValidate = false;

							return isValidate;

						}
					}

				}

			}



			return isValidate;


		},

		checkboxValue (property,type,value) {

			var index = this[property][type].indexOf(value);

			if (index > -1) {

				this[property][type].splice(index,1);

			} else {

				this[property][type].push(value);

			}

		},
		submitAction (phoneId) {

			var isValidate = this.validateForm();

			this.isValidate = validateEle;

			if (!isValidate) {

				Lizard.showToast('请完善电核信息填写');

				return;

			}

			var validateEle = ['self','rel','col','fri','emer'];


			var remark = {
				self:this.self,
				rel: this.rel,
				col: this.col,
				fri: this.fri,
				emer:this.emer

			}


			var formData = {

				remark: JSON.stringify(remark),

				result: 0
			}

			var submitData = Object.assign({},formData);

			Lizard.ajax({
				type:'POST',
				url:`/api/applications/${phoneId}/phone-reviews`,
				data:submitData
			}).then((data) => {
				if (data) {

					Lizard.showToast('电核成功, 跳转至标的列表页...');

					setTimeout(() =>{

						location.href = '/business';

					},500)

				}

			})


		},
		cancelAction (id) {

			location.href = `/business/${id}`;

		}

	},

	mounted () {

		common.headerMenu();

		dropMenu();
	}
})
