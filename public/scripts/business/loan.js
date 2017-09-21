var common = require('../common');

var Vue = require('../lib/vue');

var modelData = require('../../../model/data');

var Promise = require('es6-promise').Promise;

var Calendar = require('../widget/calendar');

var Lizard = require('../widget/lizard');

function changeObject (arr) {

	var object = {};

	arr.forEach((item) =>{

		object[item['id']] = item['brand'] + item['series'] + item['model'];

	})

	return object;

}
const {

	maritalStatusList,
	vehicleStatus,
	houseStatus,
	salaryType,
	nation,
	purposeType,
	termUnit,
	education,
	borrowingSeriesType,
	companyType

	} = modelData;

var nationObject = common.changeObject(nation,'value','title');


var vueConfig = new Vue({

	el:'#app',

	data:{
		education,
		termUnit,
		companyType,

		formData:{
			borrower:'',
			vehicle:'',
			nation:'',
			marital_status:'',
			telephone:'',
			education:'',
			is_native:'',
			is_mate_native:'',
			birthplace_province:'户籍省份',
			birthplace_city:'户籍城市',
			birthplace_address:'',
			province:'现居住地省份',
			city:'现居住地城市',
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
		purposeType,

		dropMenuList:{

			"houseProperties":[{isOpen:false,value:'请选择'}],

			"cars":[{isOpen:false,value:'请选择'}]

		},
		dropMenu: -1,
		borrowersObject:{},
		vehicleObject:{},
		nationObject,
		nation,
		purposeType,
		borrowingSeriesType,
		maritalStatusList,
		vehicleStatus,
		houseStatus,
		salaryType,
		borrowersData:[],
		vehicleData:[],
		isValidate:true,
		province:[],
		cityList:[]

	},

	created(){
		Lizard.ajax({
			type: 'GET',
			url:'/api/borrowers'
		}).then((data) => {

			var results = data.results;

			if (data && results.length) {

				this.borrowersData = results;

				this.borrowersObject  = common.changeObject(results,'id','name');

			}
		})

		this.showProvinces();

	},
	watch: {
		'dropMenuList.cars':{

			handler: function (val, oldVal) {

				this.showCalendar();
			},
			deep:true
		}
	},

	computed: {

		borrowersName () {

			var borrower = this.formData.borrower;

			if (borrower !== "") {

				var value = this.borrowersObject[borrower];

				return value;

			} else {

				return '请选择';
			}

		},
		nationName () {

			var nation = this.formData.nation;

			if (nation !== "") {

				var value = this.nationObject[nation];

				return value;

			} else {

				return '请选择';
			}

		},
		vehicleName () {

			var vehicle = this.formData.vehicle;

			if (vehicle && vehicle !== "") {

				var value = this.vehicleObject[vehicle];

				if (value) {

					if (value.length > 25) {

						value = value.slice(0, 25);

					}

				} else {

					return '请选择';
				}

				return value;

			} else {

				return '请选择';
			}

		},
		educationName () {

			var education = this.formData.education;

			if (education !== "") {

				var value = this.education[education].name;

				return value;

			} else {

				return '请选择';
			}

		},
		purposeName () {

			var purpose = this.formData.purpose;

			if (purpose !== "") {

				var value = this.purposeType[purpose].name;

				return value;

			} else {

				return '请选择';
			}

		},
		borrowingSeriesName () {

			var borrowing_type = this.formData.borrowing_type;

			if (borrowing_type !== "") {

				var value = this.borrowingSeriesType[borrowing_type].name;

				return value;

			} else {

				return '请选择';
			}
		},
		companyName () {

			var company_type = this.formData.company_type;

			if (company_type !== "") {

				var value = this.companyType[company_type].name;

				return value;

			} else {

				return '请选择';
			}

		},
		termName () {

			var term_unit = this.formData.term_unit;

			if (term_unit !== "") {

				var value = this.termUnit[term_unit].name;

				return value;

			} else {

				return '请选择';
			}

		}
	},
	mounted(){

		common.dropMenu.call(this);

		common.headerMenu();

		this.showCalendar();
	},
	methods:{
		showProvinces () {

			Lizard.ajax({
				type:'GET',
				url:'/api/provinces'
			}).then((data) => {

				var results = data.results;

				if (results && results.length) {

					this.province = results;

					this.getCityList(results[0].province_id).then((res) => {

						this.formData.birthplace_city = res[0].city_name;

						this.formData.city = res[0].city_name;

					})

					this.formData.birthplace_province = results[0].province_name;

					this.formData.province = results[0].province_name;

				}

			}).catch((err) => {

				console.log(err);
			})
		},

		selectProvince (property,province_id,province_name) {


			var province = property + 'province';

			this.formData[province] = province_name;

			this.getCityList(province_id,province_name).then((res) => {

				var city = property + 'city';

				this.formData[city] = res[0].city_name;

			})

			this.dropMenu = -1;

		},

		selectCity (property,cityName) {


			this.dropMenu = -1;

			var city = property + 'city';

			this.formData[city] = cityName;

		},
		getCityList(province_id){

			var cityList = new Promise ((resolve,reject) => {

				Lizard.ajax({
					type: 'GET',
					url: `/api/provinces/${province_id}/cities`
				}).then((data) => {

					var results = data.results;

					if (results && results.length) {

						this.cityList = results;

						resolve(results);

					}

				})
			})

			return cityList;

		},

		selectMenu (value) {

			if (this.dropMenu == value) {

				this.dropMenu = -1;

			} else {

				this.dropMenu = value;

			}

		},

		showCalendar(){

			var cars = this.dropMenuList.cars;

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

			Lizard.ajax({
				type: 'GET',
				url:`/api/borrowers/${id}/vehicles`
			}).then((data) => {

				var results = data.results;

				this.vehicleData = results;

				this.vehicleObject = changeObject(results);

				if (!results.length){

					this.formData.vehicle = '';

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

				if (this.dropMenuList[property]) {

					this.dropMenuList[property].push({isOpen:false,value:'请选择'});
				}

			} else {

				this.formData[recordType][property].push({name:'',relation:'',mobile:'',company:''});

			}

		},

		showDropMenu (property,index,value) {


			this.dropMenuList[property][index].isOpen = value;

		},

		removeRecord (recordType,property,index) {


			this.formData[recordType][property].splice(index,1);

			if (recordType == 'recordType') {

				this.dropMenuList[recordType].splice(index,1);
			}

		},
		selectValue (recordType,property,type,value,index,isOpen,name) {

			this.formData[recordType][property][index][type] = value;

			this.dropMenuList[property][index].isOpen = isOpen;

			this.dropMenuList[property][index].value = name;

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
				url:'/api/applications',
				data:submitData

			}).then((data) => {

				if (data) {

					Lizard.showToast('申请成功, 跳转至完善借款信息...');

					setTimeout(() =>{

						location.href = '/business';

					},500)

				}

			})

		}
	}

})


