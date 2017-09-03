var common = require('../common');

var Lizard = require('../widget/lizard');

var popup = require('../widget/popup');

var Vue =  require('../lib/vue');

var vueConfig = new Vue({

	el:'#app',

	data: {

		vehiclesId: '',
		dropMenu: [
			{deviceOpen:false,statusOpen:false},
			{deviceOpen:false,statusOpen:false},
			{deviceOpen:false,statusOpen:false},
			{deviceOpen:false,statusOpen:false},
			{deviceOpen:false,statusOpen:false}
		],
		gps_devices:[
			{'supplier': '谷米', 'imei': '', 'type': '0',status:'1'},
			{'supplier': '谷米', 'imei': '', 'type': '0',status:'1'},
			{'supplier': '谷米', 'imei': '', 'type': '0',status:'1'},
			{'supplier': '谷米', 'imei': '', 'type': '0',status:'1'},
			{'supplier': '谷米', 'imei': '', 'type': '0',status:'1'}
		]
	},
	methods: {

		showPopup (ele,index,vehiclesId){

			popup.showContent(ele);

			this.vehiclesId = vehiclesId;

			this.getDevices(vehiclesId)

		},
		getDevices (vehiclesId) {

			Lizard.ajax({
				type:'GET',
				url:`/api/vehicles/${vehiclesId}`
			}).then((data) => {

				var results = data.gps_devices;

				if (data && results.length) {


					var dropMenu = [];

					results.forEach((item) => {

						dropMenu.push({deviceOpen: false, statusOpen: false})

					})

					popupConfig.dropMenu = dropMenu;

					popupConfig.gps_devices = results;

				}

			})

		}

	}

})



var popupConfig = new Vue({

	el:'#addPopup',
	data:{
		number: 7,
		isStage:false,
		device_type: [{
			name: '有线',
			value: '0'
		},{
			name: '无线',
			value: '1'
		}],
		gpsStatus:[{
			name: '报废',
			value: '0',
		},{
			name: '正常',
			value: '1'
		}],
		dropMenu:vueConfig.dropMenu,
		gps_devices: vueConfig.gps_devices

	},
	methods: {

		hidePopup (ele) {

			popup.hideContent(ele);

		},

		selectValue (index,property) {

			this.dropMenu[index][property] = !this.dropMenu[index][property];



		},
		addRecord (value) {

			if (this.gps_devices.length <= this.number) {

				this.gps_devices.push(	{'supplier': '谷米', 'imei': '', 'type': 0,status:0});

				this.dropMenu.push({deviceOpen: false, statusOpen: false})

			}

		},

		addGps (ele) {

			var gps_devices = Object.assign([],this.gps_devices);

			var vehiclesId = vueConfig.vehiclesId

			Lizard.ajax({
				type: "PATCH",
				url:`/api/vehicles/${vehiclesId}`,
				data:	{
					gps_devices: JSON.stringify(gps_devices)
				}
			}).then((data) => {

				if (data) {

					Lizard.showToast('添加/修改成功');

					setTimeout(() =>{

						popup.hideContent(ele);

					},200)

				}

			})

		},
		removeRecord (index) {

			this.gps_devices.splice(index,1);

			this.dropMenu.splice(index,1);


		},
		checkValue (index, property,type,value) {

			this.gps_devices[index][property] = value;


			this.dropMenu[index][type] = false;

		}

	},

	mounted (){

		common.headerMenu();

	}

})



