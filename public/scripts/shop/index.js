
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var popup = require('../widget/popup');

var listTpl =  require('./templates/list');

var validate = require('../widget/validate');

var pagination = require('../widget/pagination');

var Vue = require('../lib/vue');

var vueConfig = new Vue ({

	el: '#app',
	data: {

		province: [],
		provinceId: '',
		cityList: [],
		provinceName:'',
		cityName: '',
		editShop:{},
		cityId:'',
		shopId:''
	},

	created () {

		this.showProvinces();

	},
	methods: {

		showPopup (ele) {

			popup.showContent(ele);

		},
		deleteShop (id) {



		},
		showProvinces () {

			Lizard.ajax({
				type:'GET',
				url:'/api/provinces'
			}).then((data) => {

			 var results = data.results;

			 if (results && results.length) {

				 this.province = results;


				 this.getCityList(results[0].province_id,results[0].province_name,null);

			 }

			}).catch((err) => {

				console.log(err);
			})
		},
		getCityList(province_id,province_name,cityName){

			Lizard.ajax({
				type:'GET',
				url:`/api/provinces/${province_id}/cities`
			}).then((data) => {

				var results = data.results;

				if (results && results.length) {

					this.cityList = results;

					this.provinceName = province_name;

					this.cityName = cityName || results[0].city_name;

				}

			})

		},
		editPopup (ele,id) {

			this.shopId = id;

			Lizard.ajax({
				type:'GET',
				url:`/api/admin/shops/${id}`,
			}).then((data) => {

				if (data) {

					var area = data.area;

					this.getCityList(area.province_id,area.province_name,area.city_name);

					this.editShop = data;

					this.cityId = area.city_id;

					popup.showContent(ele);

				}

			}).catch((err) => {

				console.log(err);
			})

		}

	}
})

var addPopup = new Vue ({

	el: '#addPopup',
	data: {

		dropMenu: -1,

		formData: {
			city:"",
			name:"",
			short_name:"",
			address:"",
			phone:"",
			admin_phone:"",
			admin_name:""

		}

	},

	computed: {

		province () {


			return vueConfig.province;

		},

		provinceName () {

			return vueConfig.provinceName;

		},

		cityName () {

			return vueConfig.cityName;
		},

		cityList () {

			return vueConfig.cityList;
		}
	},
	methods: {

		hidePopup (ele) {

			popup.hideContent(ele);

		},

		selectMenu (value) {


			if (this.dropMenu == value) {

				this.dropMenu = -1;

			} else {

				this.dropMenu =  value;
			}

		},

		selectProvince (province_id,province_name) {

			vueConfig.getCityList.call(vueConfig,province_id,province_name,null);

			this.dropMenu = -1;

		},
		selectCity (cityId,cityName) {

			this.formData.city = cityId;

			this.dropMenu = -1;

			vueConfig.cityName = cityName;

		},
		addShopList:function(){


			const formData = Object.assign({},this.formData);


			const {name, address, short_name, phone,admin_phone, admin_name } = formData;


			if (!name) {

				Lizard.showToast('请输入门店名称');

				return;
			}


			if (!short_name) {

				Lizard.showToast('请输入门店简称');

				return;
			}

			if (!phone) {

				Lizard.showToast('请输入电话');

				return;
			}

			if (!admin_phone) {

				Lizard.showToast('请输入管理员手机号');

				return;
			}

			if (!validate.isMobile(admin_phone)) {

				Lizard.showToast('请输入正确的管理员手机号');

				return;
			}


			if (!admin_name) {

				Lizard.showToast('请输入管理员姓名');

				return;
			}


			var url = '/api/admin/shops';

			var type = 2;

			this.submitShop(type,url,'POST',formData);
		},
		submitShop(type,url,method,data){

			var tips = type == 1 ? '修改' : '添加';

			Lizard.ajax({
				type:method,
				url:url,
				data:data
			}).then((data) => {

				Lizard.showToast(tips + '成功');

				setTimeout(() => {

					location.reload();

				},500)

			})
		}
	}


})


var editPopup = new Vue ({

	el: '#editPopup',
	data: {

		dropMenu: -1,
		city:''
	},

	computed: {

		formData () {

			var editShop = vueConfig.editShop;



			var params = {
				city: vueConfig.cityId,
				name: editShop.name,
				created_at: editShop.created_at,
				address: editShop.address,
				id:vueConfig.shopId,
				is_active: editShop.is_active,
				phone: editShop.phone,
				short_name: editShop.short_name

			}

			return params;

		},

		province () {

			return vueConfig.province;

		},

		provinceName () {

			return vueConfig.provinceName;

		},

		cityName () {

			return vueConfig.cityName;
		},

		cityList () {

			return vueConfig.cityList;
		},
		editShop () {

			return vueConfig.editShop;
		}
	},

	methods: {

		hidePopup (ele) {

			popup.hideContent(ele);

		},

		selectMenu (value) {

			if (this.dropMenu == value) {

				this.dropMenu = -1;

			} else {

				this.dropMenu =  value;
			}

		},

		selectProvince (province_id,province_name) {

			vueConfig.getCityList.call(vueConfig,province_id,province_name);

			this.dropMenu = -1;

		},
		selectCity (cityId,cityName) {

			vueConfig.cityId = cityId;

			this.dropMenu = -1;

			vueConfig.cityName  = cityName;

		},

		editShopList () {

			const formData = Object.assign({},this.formData);

			const shopId = this.shopId;

			const { name, short_name, address, phone, id } = formData;


			if (!name) {

				Lizard.showToast('请输入门店名称');

				return;
			}


			if (!short_name) {

				Lizard.showToast('请输入门店简称');

				return;
			}

			if (!address) {

				Lizard.showToast('请输入地址');

				return;
			}

			if (!phone) {

				Lizard.showToast('请输入电话');

				return;
			}
			if (!validate.isMobile(phone)) {

				Lizard.showToast('请输入正确的电话');

				return;
			}

			var type = 1;

			this.submitShop(type,`/api/admin/shops/${id}`,'PATCH',formData);
		},

		submitShop(type,url,method,data){

			var tips = type == 1 ? '修改' : '添加';

			Lizard.ajax({
				type: method,
				url: url,
				data: data
			}).then((data) => {

				Lizard.showToast(tips + '成功');

				setTimeout(() => {

					//location.reload();

				}, 500)

			})
		}
	}
})
