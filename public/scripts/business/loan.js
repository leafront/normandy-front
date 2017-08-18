var $ = require('../lib/jquery');

var common = require('../common');

var Vue = require('../lib/vue');

var modelData = require('../../../model/data');

var Calendar = require('../widget/calendar');

var Lizard = require('../widget/lizard');


const {

	maritalStatusList,
	vehicleStatus,
	houseStatus,
	salaryType,
	nation,
	purposeType,
	borrowingSeriesType,
	termUnit

} = modelData;

var vueConfig = new Vue({

	el:'#app',

	data:{

		formData:{
			borrower:'',
			vehicle:'',
			nation:'',
			marital_status:'',
			telephone:'',
			education:'',
			is_native:'',
			is_mate_native:'',
			birthplace_province:'',
			birthplace_city:'',
			birthplace_address:'',
			province:'',
			city:'',
			address:'',


			company_name:'',  //单位信息
			company_type:'',
			salary_type:'',
			share:'',
			department:'',
			position:'',
			work_years:'',
			salary:'',
			other_incoming:'',
			company_phone:'',
			finance_phone:'',
			social_net:{  //联系人信息
				emergencyContacts: [{name:'',relation:'',mobile:'',company:''}],
				relatives: [{name:'',relation:'',mobile:'',company:''}],
				colleagues: [{name:'',relation:'',mobile:'',company:''}],
				friends: [{name:'',relation:'',mobile:'',company:''}]
			},

			property:{
				houseProperties:[{"status":"","area":"","monthlyPay":"","address":""}],
				cars:[{"status":"","buyingDate":"","monthlyPay":"","brand":""}],
				financialAssets:[{"field":"","amount":"","desc":""}]
			},


			purpose:'',  //借款事项
			borrowing_type:'',
			amount:'',
			term:'',
			term_unit:''

		},

		dropMenu:{

			"houseProperties":[{isOpen:false,value:'请选择'}],

			"cars":[{isOpen:false,value:'请选择'}]

		},
		nation,
		purposeType,
		termUnit,
		borrowingSeriesType,
		maritalStatusList,
		vehicleStatus,
		houseStatus,
		salaryType,
		borrowersData:[],
		vehicleData:[],
		isValidate:true


	},

	created(){
		Lizard.ajax({
			type: 'POST',
			url:'/business/borrowers',
			success:(data) =>{

				var results = data.results;

				if (data && results.length) {

					this.borrowersData = results;

				}

			}
		})

	},
	watch: {
		'dropMenu.cars':{
			handler: function (val, oldVal) {

				this.showCalendar();
			},
			deep:true
		}
	},

	mounted(){

		common.dropMenu();

		common.headerMenu();

		this.showCalendar();
	},
	methods:{

		showCalendar(){

			var cars = this.dropMenu.cars;

			cars.forEach((item,index) => {

				var ele = '#buyTime' + index;

				Vue.nextTick(() => {

					var calendarItem = new Calendar({
						startYear: 2000,
						yearNum: 5,
						ele: ele,
						callback:(date) =>{

							this.formData.property.cars[index].buyingDate = date;

						}
					})

					calendarItem.showCalendar();
				})
			})
		},

		selectBorrowers (id) {

			this.formData.borrower = id;

			$('#vehicleName').text('请选择车辆');

			Lizard.ajax({
				type: 'POST',
				url:'/business/vehicles',
				data:{
					id
				},
				success: (data) =>{

					var results = data.results;

					this.vehicleData = results;

					if (!results.length){

						this.formData.vehicle = '';

					}

				}
			})
		},

		checkValue(property,value){

			this.formData[property] = value;
		},
		addRecord (recordType,property) {

			var typeList = {

				houseProperties: {"status":"","area":"","monthlyPay":"","address":""},

				cars:{"status":"","buyingDate":"","monthlyPay":"","brand":""},

				financialAssets:{"field":"","amount":"","desc":""}

			};

			if (recordType == 'property') {


				this.formData[recordType][property].push(typeList[property]);

				if (this.dropMenu[property]) {

					this.dropMenu[property].push({isOpen:false,value:'请选择'});
				}

			} else {

				this.formData[recordType][property].push({name:'',relation:'',mobile:'',company:''});

			}

		},

		showDropMenu (property,index,value) {


			this.dropMenu[property][index].isOpen = value;

		},

		removeRecord (recordType,property,index) {


			this.formData[recordType][property].splice(index,1);

			if (recordType == 'recordType') {

				this.dropMenu[recordType].splice(index,1);
			}

		},
		selectValue (recordType,property,type,value,index,isOpen,name) {

			this.formData[recordType][property][index][type] = value;

			this.dropMenu[property][index].isOpen = isOpen;

			this.dropMenu[property][index].value = name;

		},

		validateForm(formData){

			var isValidate = true;

			for (var attr in formData ) {

				var value =  formData[attr];

				if (typeof value !== "object") {

					if (value === '') {

						isValidate = false;

						return isValidate;

					}

				}

			}

			var validateEle = ['social_net','property'];

			for (var i = 0; i < validateEle.length; i++) {

				for (var attr in formData[validateEle[i]]) {

					var list = formData[validateEle[i]][attr];

					for (var j = 0, len = list.length; j < len; j++) {


						for (var cAttr in list[j]) {

							var value = list[j][cAttr];

							if (value === '') {

								isValidate = false;

								return isValidate;

							}
						}

					}

				}

			}

			return isValidate;


		},

		submitVehicle () {

			var formData = this.formData;

			var isValidate = this.validateForm(this.formData);

			this.isValidate = isValidate;

			if (!isValidate) {

				Lizard.showToast('请完善申请借款信息');

				return;

			}

			var submitData = Object.assign({},formData);

			submitData.social_net = JSON.stringify(submitData.social_net);

			submitData.property = JSON.stringify(submitData.property);

			Lizard.ajax({
				type:'POST',
				url:'/business/loan/add',
				data:formData,
				success:(data) =>{

					if (data) {

						Lizard.showToast('申请成功, 跳转至借款列表...');

						setTimeout(() =>{

							location.href = '/business';

						},500)

					}
				}

			})

		}
	}

})


