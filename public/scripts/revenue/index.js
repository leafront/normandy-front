var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var popup = require('../widget/popup');

var dataModel = require('../../../model/data');

var validate = require('../widget/validate');

var local = require('../widget/local');

var Vue = require('../lib/vue');

const {

	repaymentType,
	termUnit

} = dataModel;

var vueConfig = new Vue({
	el: '#app',
	data: {
		repaymentType,
		termUnit,
		dropMenu: -1,
		revenue: {
			amount: '',
			repay_type:'',
			term:'',
			term_unit: '',
			borrow_rate:'',

			agency:'',
			assessment:'',
			illegal_deposit:'',
			GPS_deposit:'',
			parking:'',
			GPS_using:'',
			risk_deposit:'',
			risk_deposit_rate:'',
			advanced_in_others: [{amount:'',remark:''}],  //其他费用（预收）
			advanced_in_other_deposit: [{amount:'',remark:''}],  //其他押金（预收

			others_each_term: [{'amount':'','remark':''}],  //其他费用（每期收）

			out_others:[{'amount':'','remark':''}],

			out_others_deposit: [{'amount':'','remark':''}],

			out_others_each_team: [{'amount':'','remark':''}],

			account_manage: '',  //账户管理费用(预付)

			bond:'', //保证金（押金）

			lend_rate:'', //资方费率

			out_type: '' //资方还款方式
		},

		isValidate: true

	},
	computed: {

		repayType () {

			var repay_type = this.revenue.repay_type;

			if (repay_type !== "") {

				var value = this.repaymentType[repay_type].name;

				return value;

			} else {

				return '请选择';
			}

		},
		termUnitType () {

			var term_unit = this.revenue.term_unit;

			if (term_unit !== "") {

				var value = this.termUnit[term_unit].name;

				return value;

			} else {

				return '请选择';
			}
		},

		outType () {

			var out_type = this.revenue.out_type;

			if (out_type !== "") {

				var value = this.repaymentType[out_type].name;

				return value;

			} else {

				return '请选择';
			}

		}

	},
	methods: {

		addRecord (property) {

			this.revenue[property].push({amount:'',remark:''});

		},

		removeRecord (property,index) {

			this.revenue[property].splice(index,1);

		},

		customStage () {

			popup.showContent('#popup');

		},
		checkValue (property,value) {

			this.revenue[property] = value;

			this.dropMenu = -1;

		},
		selectMenu (value) {

			if (this.dropMenu == value) {

				this.dropMenu = -1;

			} else {

				this.dropMenu = value;

			}
		},

		submitCalc (shopId){

			var repay_schema = [];

			const isStage = popupConfig.isStage;

			if (isStage) {

				repay_schema = popupConfig.repay_schema;

			}


			let formData = Object.assign({repay_schema, shop_id: shopId}, this.revenue);

			let {
				amount, repay_type, term, term_unit, borrow_rate,
				agency, assessment,illegal_deposit, GPS_deposit,parking
				,GPS_using,risk_deposit,
				out_type,
				advanced_in_others,
				advanced_in_other_deposit,
				others_each_term,
				lend_rate,
				out_others,
				out_others_deposit,
				out_others_each_team
				} = formData;


			formData = common.deleteEmptyProperty(formData);


			if (!amount) {

				Lizard.showToast('请输入借款金额');

				return;

			}

			if (!validate.isNumber(amount)) {

				Lizard.showToast('请输入正确的借款金额');

				return;

			}

			if (repay_type === "") {

				Lizard.showToast('请选择还款类型');

				return;

			}

			if (!term) {

				Lizard.showToast('请选择借款期限');

				return;
			}

			if (term_unit === "") {

				Lizard.showToast('请选择借款期限的天数或者个月');

				return;
			}

			if (!borrow_rate) {

				Lizard.showToast('请输入综合服务费率');

				return;

			}

			if (!validate.isPercent(borrow_rate)) {

				Lizard.showToast('请输入正确的综合服务费率');

				return;

			}

			var validateInput = [{
				name: 'agency',
				message: '请输入正确的中介费金额'
			}, {
				name: 'assessment',
				message: '请输入正确的评估费(预收)金额'
			}, {
				name: 'illegal_deposit',
				message: '请输入正确的违章押金(押金)金额 '
			}, {
				name: 'GPS_deposit',
				message: '请输入正确的GPS押金(押金)金额'
			}, {
				name: 'parking',
				message: '请输入正确的停车费用(每期收)金额'
			}, {
				name: 'GPS_using',
				message: '请输入正确的GPS费用(每期收)金额'
			}, {
				name: 'risk_deposit',
				message: '请输入正确的风险押金(押金)金额'
			}, {
				name: 'account_manage',
				message: '请输入正确的账户管理费用(预付)'
			}, {
				name: 'bond',
				message: '请输入正确的保证金(押金)'
			}];

			var isValidateInput = validateInput.every((item) => {

				if (!validate.isNumber(formData[item.name]) && formData[item.name]) {

					Lizard.showToast(item.message);

					return false;

				}

				return true;

			})


			var validateEle = [{
				ele: advanced_in_others,
				isValidate: true,
				message: '请完善其他费用(预收)信息填写'
			},
				{
					ele: advanced_in_other_deposit,
					isValidate: true,
					message: '请完善其他押金(预收)信息填写'
				}, {

					ele: others_each_term,
					isValidate: true,
					message: '请完善其他费用(每期收)信息填写'

				}, {
					ele: out_others,
					isValidate: true,
					message: '请完善其他费用(预付)信息填写'
				}, {
					ele: out_others_deposit,
					isValidate: true,
					message: '请完善其他押金(预付)信息填写'
				}, {
					ele: out_others_each_team,
					isValidate: true,
					message: '请完善其他费用(每期付)信息填写'
			}];

			for (var i = 0, len = validateEle.length; i < len; i++) {

				var iEle  = validateEle[i].ele;

				var iLen = iEle.length;

				if (iLen) {

					for (var j = 0; j < iLen; j++) {

						var value = iEle[j];

						if ((value.amount === "" && value.remark) || (value.amount && value.remark === "")) {

							validateEle[i].isValidate = false;

							break;

						}
					}
				}

			}


			validateEle.forEach((item) => {

				common.deleteEmptyArray(validateEle,item.ele,'ele');

			})


			console.log(JSON.stringify(validateEle,null,2))

			var isValidateArray =  validateEle.every((item) => {

				if (!item.isValidate) {

					Lizard.showToast(item.message);

					return false;

				}

				return true;

			})



			if (!lend_rate) {

				Lizard.showToast('请输入资方费率');

				return;
			}

			if (out_type === "") {

				Lizard.showToast('资方还款方式');

				return;

			}


			if (!isValidateArray) {

				return;
			}

			if (!isValidateInput) {

				return;

			}


			Lizard.ajax({
				type:'POST',
				url:'/api/calculator/cal_and_get_view',
				data:JSON.stringify(formData),
				headers:{
					'Content-type':'application/json'
				}
			}).then((data) => {

				if (data) {

					local.set('revenue_formData',formData);

					location.href = '/revenue/report';

				}

			})

		}

	},

	mounted () {

		common.headerMenu();

		common.dropMenu();

	}

})



var popupConfig = new Vue({

	el:'#popup',
	data:{
		isStage:false,
		iStage:1,
		repay_schema:[{"term": 1,"amount":""}], //可空
		dropMenu:[]
	},
	created() {

		var dropMenu = [];

		this.repay_schema.forEach(function(){

			dropMenu.push({isOpen:false,value:'请选择'})

		})

		this.dropMenu = dropMenu;

	},
	computed: {

		stage () {

			var revenue = vueConfig.revenue;

			if (revenue.term_unit == 0 && revenue.term) {

				return 1;

			} else if (revenue.term_unit == 1 && revenue.term ){

				return revenue.term;

			}

		}

	},
	methods: {

		checkValue (property, value) {

			this.repay_schema[property] = value;

		},

		hidePopup () {

			popup.hideContent('#popup');

			this.isStage = false;

			this.iStage = 1;

			this.repay_schema = [{"term": 1,"interest":"","capital":""}];

		},

		addStage () {

			var isValidate = true;

			this.repay_schema.forEach((item) =>{

				for (var attr in item) {

					if (item[attr] === "") {

						Lizard.showToast('请完善借款信息');

						isValidate = false;

						return;

					}
				}

			})

			if (isValidate) {

				this.isStage = true;

				popup.hideContent('#popup');

			}

		},
		addRecord (value) {

			this.iStage += 1;

			if (this.repay_schema.length < this.stage ) {

				this.repay_schema.push({"term": this.iStage,"interest":"","capital":""});

				this.dropMenu.push({"isOpen": false,value:"请选择"})

			}

		},
		removeRecord (index) {

			this.repay_schema.splice(index,1);

			this.dropMenu.splice(index,1);

		},
		showMenu (isOpen,index) {


			this.dropMenu[index].isOpen = isOpen;

		},
		selectValue (index,value){

			this.dropMenu[index].isOpen = false;

			var isValidate = true;

			this.repay_schema.forEach((item) =>{

				if (item.term == value){

					Lizard.showToast(`当前已选择第${value}期`);

					isValidate = false;

				}

			})


			if (isValidate) {

				this.repay_schema[index].term = value;

			}

		}
	}
})



