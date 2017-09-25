
var $ = require('../lib/jquery');

var util = require('../lib/util/index');

var common = require('../common');

var Lizard = require('../widget/lizard');

var paginationTpl = require('../templates/pagination');

var pagination = require('../widget/pagination');

var Calendar = require('../widget/calendar');

var data = require('../../../model/data');

var Vue = require('../lib/vue');

let {
	deviceType,
	colorList,
	borrowingStatus,
	gpsStatus

} = data;

gpsStatus = common.changeObject(gpsStatus,'value','name');

var queryParams = {

	vin: Lizard.query('vin') || '',
	status: Lizard.query('status') || '',
	name: Lizard.query('name') || '',
	from: Lizard.query('from') || '',
	to: Lizard.query('to') || '',
	gps_status: Lizard.query('gps_status') || '',
	related_borrowing_status: Lizard.query('related_borrowing_status') || ''
}

let gpsList = {};

vehiclesList.forEach((item) =>{

	gpsList[item.id] = item.gps_status_detail;

})



var vueConfig = new Vue({

	el:'#app',
	data:{
		params:queryParams,
		dropMenu: -1,
		borrowingStatus,
		gpsStatus,
		gpsInfo: {},
		gpsList:gpsList,
		riskLevel:{'low':'底','middle':'中','high':'高'},
		vehicle_ids: [],
		deviceStatus:[{name:'行驶',value:0},{name:'未上线',value:1},{name:'过期',value:2},{name:'离线',value:3},{name:'静止',value:4}]
	},

	mounted(){

		common.headerMenu();

		this.showCalendar();

		this.showTips();

		var paginationList = document.querySelector('.pagination_list');

		if (paginationList) {

			paginationList.addEventListener("click",function(event) {

				if(event.target && event.target.className == "js_page") {

					event.preventDefault();

					var params = Lizard.query();

					var href = event.target.getAttribute('href');

					var page = href.split('?')[1];

					page = parseInt(page.split('=')[1]);

					params.page = page;

					params = util.queryStringify(params);

					location.href = `/vehicles?${params}`;

				}
			})

		}

		document.documentElement.addEventListener('click',() => {

			this.dropMenu = -1;

		})


	},
	computed: {

		loanStatus () {

			var status = this.params.related_borrowing_status;

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

				var value = this.gpsStatus[status];

				return value;

			} else {

				return '请选择';
			}

		}
	},

	methods: {
		showTips () {

			var hoverTimer, outTimer;

			$('.gps_error,.gps_warning').hover(function(){

				clearTimeout(outTimer);

				hoverTimer = setTimeout(() =>{

					$('.vehicles_tips').removeClass('active');

					$(this).next('.vehicles_tips').addClass('active');

				},500)

			},function(){

				clearTimeout(hoverTimer);

				outTimer = setTimeout(() =>{

					$('.vehicles_tips').removeClass('active');

					$(this).next('.vehicles_tips').removeClass('active');

				},500)

			})

		},

		deviceInfo (id,gps_device) {


			var imei_ids = [];

			gps_device.forEach( (item) => {

				if (item.status && item.status== 1) {

					imei_ids.push(item.imei);

				}

			})

			if (!imei_ids.length) {

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

					this.dropMenu = id;

				} else {

					this.gpsInfo = {};

					Lizard.showToast('当前无GPS设备状态信息');
				}

			})

		},
		mapInfo (gpsStatus,imei,type) {

			if (gpsStatus == 0 || gpsStatus == 3 || gpsStatus == 4 ) {

				window.open(`/vehicles/map/${imei}?driveType=${type}`);

			}

		},

		refreshGps (shopId) {

			Lizard.ajax({
				type: 'POST',
				url: '/api/vehicles/gps/status',
				data: {
				  shop_id:shopId
				}
			}).then((data) =>{

				if (data) {

					Lizard.showToast('刷新GPS状态成功');

					location.reload();

				}

			})

		},

		oneRefreshGps (index,vehiclesId) {

			Lizard.ajax({
				type: 'POST',
				url: '/api/vehicles/gps/tracking',
				data:{
					vehicle_id: [vehiclesId]
				}
			}).then((data) => {

				if (data) {

					if (data[vehiclesId]) {

						let gpsList =  Object.assign({},this.gpsList);

						this.gpsList = Object.assign(gpsList,data);

						Lizard.showToast('刷新GPS状态成功');


					} else {

						Lizard.showToast('刷新GPS状态失败');
					}

				} else {

					Lizard.showToast('刷新GPS状态失败');

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

		selectDropMenu (id, gps_devices) {

			var dropMenu  = this.dropMenu;

			if (dropMenu == id) {

				this.dropMenu = -1;

			} else {

				this.deviceInfo(id,gps_devices);

			}

		},

		checkValue (property, value) {

			this.params[property] = value;

		},


		fetch (data) {

			var page = Lizard.query('page');

			page = page ? { page: page} : {};

			var formData = Object.assign(page, data );

			formData = util.queryStringify(formData);

			if (formData == "") {

				location.href = `/vehicles`;

			} else {

				location.href = `/vehicles?${formData}`;

			}

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

			history.pushState(null,null,'/vehicles');

			this.fetch(null);

		}
	}
})
