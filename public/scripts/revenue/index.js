var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var popup = require('../widget/popup');

var Vue = require('../lib/vue');

var vueConfig = new Vue({
	el: '#app',
	data: {
		revenue: {

			amount: '',
			repay_type:'',
			term:'',
			term_unit: '',
			interest_rate:'',
			fees: {
				other_fee: {
					name:'',
					value:''
				}
			}
		},
		loanType:'请选择',

		isValidate: true

	},
	methods: {

		customStage () {

			popup.showContent('#popup');

		},
		checkValue (property,value) {

			this.revenue[property] = value;

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
		repay_schema:[{"term": 1,"interest":"","capital":""}],
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



