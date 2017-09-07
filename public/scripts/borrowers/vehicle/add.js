var common = require('../../common');

var Lizard = require('../../widget/lizard');

var popup = require('../../widget/popup');

var Calendar = require('../../widget/calendar');

var validate = require('../../widget/validate');

var Vue = require('../../lib/vue');

var dataModel = require('../../../../model/data');

const {

	carType,
	colorList

} = dataModel;

var carTypeObject = common.changeObject(carType);

var vueConfig = new Vue({

	el:'#app',
	data:{
		dropMenu: -1,
		carTypeObject,
		colorList,
		formData: {
			type:'', car_name:'', plate_number:'',
			vin:'', engine_number:'', production_day:'',
			color:'', displacement:'', shifting:0, driver_type:0
		}
	},

	computed: {

		carTypeStatus () {

			var type = this.formData.type;

			if (type !== "") {

				var value = this.carTypeObject[type];

				return value;

			} else {

				return '请选择车辆类型';
			}

		},

		colorType () {

			var color = this.formData.color;

			if (color !== "") {

				var value = this.colorList[color].name;

				return value;

			} else {

				return '请选择颜色';
			}

		}

	},
	methods: {

		showPopup () {

			popup.showContent('#carPopup');

		},

		checkValue (property,value) {

			this.formData[property] = value;

		},

		selectMenu (value) {

			this.dropMenu = value;

		},

		widgetCalendar(){

			var calendar = new Calendar({
				startYear: 2000,
				yearNum:5,
				ele:'#madeTime',
				callback:(date) =>{

					this.formData.production_day = date;

				}
			})

			calendar.showCalendar();

		},
		cancelVehicles (detailId) {

			location.href = `/borrowers/${detailId}`;

		},
		submitVehicles(detailId){

			var formData = Object.assign(this.formData,popupConfig.formData);

			var validateEle  = [{
				name:'type',
				message:'请选择车辆类型'
			},{
				name:'car_name',
				message:'请选择品牌类型'
			},{
				name:'plate_number',
				message:'请输入车牌号'
			},{
				name:'vin',
				message:'请输入车架号'
			},{
				name:'engine_number',
				message:'请输入发动机号'
			},{
				name:'production_day',
				message:'请选择出厂日期'
			},{
				name:'color',
				message:'请选择颜色'
			},{
				name:'displacement',
				message:'请输入排量'
			}];

			var isValidate = validateEle.every((item) =>{

				if (!formData[item.name]) {

					Lizard.showToast(item.message);

					return false;

				}

				return true;

			})

			if (!isValidate) {

				return;

			}

			if (!validate.isCarNumber(formData.plate_number)) {

				Lizard.showToast('请输入正确的车牌号');

				return;
			}
			if (!validate.isVin(formData.vin)) {

				Lizard.showToast('请输入正确的17位唯一车架号');

				return;

			}

			if (!validate.isEngineNumber(formData.engine_number)) {

				Lizard.showToast('请输入正确的发动机号');

				return;

			}

			if (!validate.isDisplacement(formData.displacement)){

				Lizard.showToast('请输入正确的排量');

				return;

			}

			Lizard.ajax({
				type: 'POST',
				url: `/api/borrowers/${detailId}/vehicles`,
				data:formData,
				success(data){

					if (data){

						Lizard.showToast('添加成功, 跳转至借款人详情');

						setTimeout(() => {

							location.href = `/borrowers/${detailId}`;

						},500)

					}
				}
			})
		}
	},
	mounted () {

		common.headerMenu();

		this.widgetCalendar();

		document.documentElement.onclick = () =>{

			this.dropMenu = -1;

		}
	}
})


var popupConfig = new Vue({
	el: '#carPopup',
	data: {
		letterNav: [],
		brandList: [],
		typeList: [],
		modelList: [],
		formData:{ brand:'', series:'', model:'' }

	},
	methods: {

		getGroupArr(results,property){

			var list = [];

			results.forEach((item, i) => {

				let index = -1;

				let alreadyExists = list.some((newItem, j) => {
					if (item[property] === newItem[property]) {
						index = j;
						return true;
					}
				})
				if (!alreadyExists) {
					list.push({
						[property]: item[property],
						results: [item]
					})
				} else {
					list[index].results.push(item);
				}

			})

			return list;

		},

		saveCar () {

			vueConfig.formData.car_name = this.formData.brand + this.formData.series + this.formData.model;

			popup.hideContent('#carPopup');

		},

		hidePopup () {

			popup.hideContent('#carPopup');

		},

		showLetterNav (initial){

			document.getElementById('letter-' + initial).scrollIntoView();

		},

		selectBrand (event,{id, name}) {

			var ele = Array.prototype.slice.apply(document.querySelectorAll('#carBrand dd'));

			ele.forEach((item) => {

				item.classList.remove('active');

			})


			event.currentTarget.classList.add('active');

			this.formData.brand = name;

			this.getCarType(id);

		},

		selectType (event,{id, name}) {


			var ele = Array.prototype.slice.apply(document.querySelectorAll('#carType dd'));

			ele.forEach((item) => {

				item.classList.remove('active');

			})

			event.currentTarget.classList.add('active');

			this.formData.series = name;

			this.getCarModel(id);

		},

		selectModel (event,{id, name}) {

			var ele = Array.prototype.slice.apply(document.querySelectorAll('#carModel dd'));

			ele.forEach((item) => {

				item.classList.remove('active');

			})

			event.currentTarget.classList.add('active');

			this.formData.model = name;

		},

		getBrandList() {

			Lizard.ajax({
				type:'GET',
				url:'/api/brands'
			}).then((data) => {

				var results = data.results;

				if (data && results.length) {

					var letterNav = [];

					results.forEach((item, i) => {

						if (letterNav.indexOf(item.initial) === -1) {

							letterNav.push(item.initial)
						}

					})

					var list = this.getGroupArr(results,'initial');

					this.letterNav = letterNav;

					this.brandList = list;

					this.formData.brand = list[0].results[0].name;

					this.getCarType(results[0].id);
				}

			})
		},
		getCarType(brandId){

			Lizard.ajax({
				type:'GET',
				url:`/api/series`,
				data: {
					brand_id:brandId
				}
			}).then((data) => {

				var results = data.results;

				if (data && results.length) {

					var list = this.getGroupArr(results, 'group_name');

					this.typeList = list;

					this.formData.series = list[0].results[0].name;

					this.getCarModel(results[0].id);
				}
			})

	  },
		getCarModel(typeId){

			Lizard.ajax({
				type:'GET',
				url:'/api/models',
				data: {
					series_id: typeId
				}
			}).then((data) => {

				var results = data.results;

				if (data && results.length) {

					var list = this.getGroupArr(results,'year');

					this.modelList = list;

					this.formData.model = list[0].results[0].name;

				}
			})
		}
	},

	created () {

		this.getBrandList();

	}

})
