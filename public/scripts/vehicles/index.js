
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var listTpl =  require('./templates/list');

var paginationTpl = require('../templates/pagination');

var pagination = require('../widget/pagination');

var Calendar = require('../widget/calendar');

var data = require('../../../model/data');

var Vue = require('../lib/vue');

const {
	deviceType,
	colorList,
	borrowingStatus,
	gpsStatus

} = data;


var vueConfig = new Vue({

	el:'#app',
	data:{
		params:{ vin:"",status:"", name:"", from:"", to:"", gps_status:'', ralated_borrowing_status:''},
		dropMenu: -1,
		borrowingStatus,
		gpsStatus,
		gpsInfo: {},
		gpsList:[],
		vehicle_ids: [],
		deviceStatus:[{name:'行驶',value:0},{name:'未上线',value:1},{name:'过期',value:2},{name:'离线',value:3},{name:'静止',value:4}]
	},

	mounted(){

		common.headerMenu();

		this.showCalendar();


		document.documentElement.addEventListener('click',() => {

			this.dropMenu = -1;

		})


	},

	updated () {


		$('.gps_error').hover(function(){

			setTimeout(() =>{

				$(this).next('.vehicles_tips').addClass('active');

			},200)

		},function(){

			setTimeout(() =>{

				$(this).next('.vehicles_tips').removeClass('active');

			},200)

		})

	},
	computed: {

		loanStatus () {

			var status = this.params.ralated_borrowing_status;

			if (status !== "") {

				var value = this.borrowingStatus[status].title;

				return value;

			} else {

				return '请选择';
			}

		},

		gpsMenuStatus () {

			var status = this.params.gps_status;

			if (status !== "") {

				var value = this.gpsStatus[status].name;

				return value;

			} else {

				return '请选择';
			}

		}
	},

	created () {

		var vehicle_ids = [];

		vehiclesList.forEach( (item) =>{

			vehicle_ids.push(item.id);

		})

		this.vehicle_ids = vehicle_ids;


		this.fetchGps(vehicle_ids);

	},
	methods: {

		deviceInfo (gps_device,vin) {

			var imei_ids = [];

			gps_device.forEach( (item) => {

				if (item.status == 1) {

					imei_ids.push(item.imei);

				}

			})

			if (!gps_device.length) {

				Lizard.showToast('当前无GPS设备状态信息');

				return;

			}

			Lizard.ajax({

				type: 'POST',
				url: '/api/gps/tracking',
				data: {
					imei_ids:imei_ids
				}
			}).then((data) => {

				var results = data.data;

				var gpsInfo = {};

				if (results && results.length) {

					results.forEach((item) => {

						gpsInfo[item.imei] = {

							device_info: item.device_info,

							device_info_new: item.device_info_new

						}

					})

					this.gpsInfo = gpsInfo;

					this.dropMenu = vin;

				} else {

					this.gpsInfo = {};

					Lizard.showToast('当前无GPS设备状态信息');
				}

			})

		},

		fetchGps (formData,fn) {

			Lizard.ajax({
				type: 'POST',
				url: '/api/vehicles/gps/tracking',
				traditional: true,
				data:{
					vehicle_ids: formData
				}
			}).then((data) => {

				if (data) {

					var gpsList = [];

					for (var attr in data) {

						gpsList.push(data[attr]);

					}

					this.gpsList = gpsList;

					fn && fn();

				}

			})

		},

		mapInfo (gpsStatus,imei) {

			if (gpsStatus == 0 || gpsStatus == 3 || gpsStatus == 4 ) {

				window.open(`/vehicles/map/${imei}`);

			}

		},

		refreshGps () {

			this.fetchGps(this.vehicle_ids,function(){Lizard.showToast('刷新GPS状态成功')});

		},

		oneRefreshGps (index,vehiclesId) {

			Lizard.ajax({
				type: 'POST',
				url: '/api/vehicles/gps/tracking',
				traditional: true,
				data:{
					vehicle_ids: [vehiclesId]
				}
			}).then((data) => {

				if (data) {

					var gpsList = [];

					for (var attr in data) {

						gpsList.push(data[attr]);

					}

					this.gpsList.splice(index,1,gpsList[0]);

					Lizard.showToast('刷新GPS状态成功');
				}

			})

		},

		showCalendar(){

			var times = [{ele: '#fromTime', name: 'from'}, {ele: '#endTime', name: 'to'}];


			times.forEach((item, index) => {

				var calendarItem = new Calendar({
					startYear: 2000,
					yearNum: 5,
					ele: item.ele,
					callback: (date) => {

						this.params[item.name] = date;

					}
				})

				calendarItem.showCalendar();
			})


		},

		selectValue (index) {

			var dropMenu  = this.dropMenu;

			if (dropMenu == index) {

				this.dropMenu = -1;

			} else {

				this.dropMenu = index;
			}

		},

		selectDropMenu (vin, gps_devices) {

			var dropMenu  = this.dropMenu;

			if (dropMenu == vin) {

				this.dropMenu = -1;

			} else {

				this.deviceInfo(gps_devices,vin);

			}

		},

		checkValue (property, value) {

			this.params[property] = value;

		},


		fetch (data) {

			var page = Lizard.query('page') || {};

			var formData = Object.assign({ page }, data );

			pagination.pageList('/api/vehicles',formData,listTpl,{colorList})
		},

		query () {

			var data = Object.assign({},this.params);

			var startTime = data.from;

			var endTime = data.to;



			startTime =  startTime.replace('/\-/','/');

			endTime =  endTime.replace('/\-/','/');

			if ((startTime && endTime) && new Date(startTime).getTime() > new Date(endTime).getTime()) {

				Lizard.showToast('开始时间不能大于结束时间');

				return;

			}

			data = common.deleteEmptyProperty(data);

			this.fetch(data);

		},

		reset () {

			this.params = {
				mobile:"",
				name:"",
				from:"",
				to:"",
				status:""
			}

			this.fetch(null);

		}
	}
})
