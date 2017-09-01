var $ = require('../../lib/jquery');

var common = require('../../common');

var Lizard = require('../../widget/lizard');

var popup = require('../../widget/popup');

var Calendar = require('../../widget/calendar');

var validate = require('../../widget/validate');

var Page = require('../../widget/page');

var Vue = require('../../lib/vue');

var popup = new Vue({
	el: '#carPopup',
	data: {

		letterNav: [],
		brandList: [],
		brandName: '',
		typeName: '',
		modelName: ''
	},
	methods: {

		getBrandList() {

			Lizard.ajax({
				type:'POST',
				url:'/borrowers/brand',
				success:(data) =>{

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

						this.brandName = list[0].results[0].name;

						//this.getCarType(results[0].id);
					}
				}
			})
		}
	},

	created () {

		this.getBrandList();

	}
})


//Page({
//
//	ajax(){
//
//		this.getBrandList();
//
//	},
//
//	onShow(){
//
//		common.headerMenu();
//
//		common.dropMenu();
//
//		this.widgetCalendar();
//
//	},
//	widgetCalendar(){
//
//		var calendar = new Calendar({
//			startYear: 2000,
//			yearNum:5,
//			ele:'#madeTime'
//		})
//
//		calendar.showCalendar();
//
//	},
//
//	bindEvents(){
//
//		this.selectType();
//
//		this.showCarPopup();
//
//		this.vehicleAction();
//
//	},
//
//	showCarPopup(){
//
//		var This  = this;
//
//		$('.carNav_list').on('click','li',function(){
//
//			var initial = $(this).data('initial');
//
//
//			document.getElementById('letter-' + initial).scrollIntoView();
//
//		})
//
//		$('#brandList').on('click','dd',function(){
//
//			var brandId = $(this).data('brandid');
//
//			$('#brandList dd').removeClass('active');
//
//			$(this).addClass('active');
//
//			var brandName = $(this).text();
//
//			$('#brandName').val(brandName);
//
//			This.getCarType(brandId);
//
//		})
//
//		$('#carType').on('click','dd',function(){
//
//			var typeId = $(this).data('typeid');
//
//			$('#carType dd').removeClass('active');
//
//			$(this).addClass('active');
//
//			var typeName = $(this).text();
//
//			$('#typeName').val(typeName);
//
//			This.getCarModel(typeId);
//
//		})
//
//
//		$('#carModel').on('click','dd',function() {
//
//			var modelName = $(this).text();
//
//			$('#carModel dd').removeClass('active');
//
//			$(this).addClass('active');
//
//			$('#modelName').val(modelName);
//
//		})
//
//		$('#js_brand').click(function(){
//
//			popup.showContent('#carPopup');
//
//		})
//
//
//		$('.js_cancel').click(function(){
//
//			popup.hideContent('#carPopup')
//
//		})
//
//		$('.js_confirm').click(function(){
//
//
//			popup.hideContent('#carPopup');
//
//			$('#js_brand').val($('#brandName').val() + $('#typeName').val() + $('#modelName').val());
//
//		})
//
//		$('.popup_mask').click(function(){
//
//			popup.hideContent('#carPopup');
//
//		})
//
//	},
//
//	selectType(){
//
//		$('.shiftingType').click(function(){
//
//			var value = $(this).data('value');
//
//			$('#shiftingType').data('value',value);
//
//			$(this).addClass('active').siblings().removeClass('active');
//
//		})
//
//		$('.driverType').click(function(){
//
//			var value = $(this).data('value');
//
//			$('#driverType').data('value',value);
//
//			$(this).addClass('active').siblings().removeClass('active');
//
//		})
//
//
//	},
//
//	getGroupArr(results,property){
//
//		var list = [];
//
//		results.forEach((item, i) => {
//
//			let index = -1;
//
//			let alreadyExists = list.some((newItem, j) => {
//				if (item[property] === newItem[property]) {
//					index = j;
//					return true;
//				}
//			})
//			if (!alreadyExists) {
//				list.push({
//					[property]: item[property],
//					results: [item]
//				})
//			} else {
//				list[index].results.push(item);
//			}
//
//		})
//
//		return list;
//
//	},
//
//	vehicleAction(){
//
//		$('.js_submit').click(() =>{
//
//			var id = $('#detailId').val();
//
//			var vehicleType = $.trim($('#vehicleType').data('value'));
//
//			var carName = $.trim($('#js_brand').val());
//
//			var license = $.trim($('#license').val());
//
//			var vin = $.trim($('#vin').val());
//
//			var engine = $.trim($('#engine').val());
//
//			var madeTime = $.trim($('#madeTime').val());
//
//			var vehicleColor = $.trim($('#vehicleColor').data('value'));
//
//			var volume = $.trim($('#volume').val());
//
//			var shiftingType = $.trim($('#shiftingType').data('value'));
//
//			var driverType = $.trim($('#driverType').data('value'));
//
//			var brand = $('#brandName').val();
//
//			var series = $('#typeName').val();
//
//			var model = $('#modelName').val();
//
//
//			if (!vehicleType){
//
//				Lizard.showToast('请选择车辆类型');
//
//				return;
//
//			}
//
//			if (!carName) {
//
//				Lizard.showToast('请选择品牌类型');
//
//				return;
//
//			}
//
//			if (!license) {
//
//				Lizard.showToast('请输入车牌号');
//
//				return;
//
//			}
//
//			if (!validate.isCarNumber(license)) {
//
//				Lizard.showToast('请输入正确的车牌号');
//
//				return;
//			}
//
//			if (!vin) {
//
//				Lizard.showToast('请输入车架号');
//
//				return;
//
//			}
//
//			if (!validate.isVin(vin)) {
//
//				Lizard.showToast('请输入正确的17位唯一车架号');
//
//				return;
//
//			}
//
//			if (!engine) {
//
//				Lizard.showToast('请输入发动机号');
//
//				return;
//
//			}
//
//			if (!validate.isEngineNumber(engine)) {
//
//				Lizard.showToast('请输入正确的发动机号');
//
//				return;
//
//			}
//
//			if (!madeTime) {
//
//				Lizard.showToast('请选择出厂日期');
//
//				return;
//
//			}
//
//
//			if (!vehicleColor) {
//
//				Lizard.showToast('请选择颜色');
//
//				return;
//
//			}
//
//			if (!volume) {
//
//				Lizard.showToast('请输入排量');
//
//				return;
//
//			}
//
//			if (!validate.isDisplacement(volume)){
//
//				Lizard.showToast('请输入正确的排量');
//
//				return;
//
//			}
//
//			var data = {
//				id: id,
//				data:{
//					brand:brand,
//					series,series,
//					model,model,
//					type:vehicleType,
//					car_name:carName,
//					plate_number:license,
//					vin:vin,
//					engine_number:engine,
//					production_day:madeTime,
//					color:vehicleColor,
//					displacement:volume,
//					shifting:shiftingType,
//					driver_type:driverType
//				}
//			}
//
//			this.submitVehicles(data);
//
//		})
//
//	},
//
//	submitVehicles(formData){
//
//		Lizard.ajax({
//			type: 'POST',
//			url: '/borrowers/vehicles/add',
//			data:formData,
//			success(data){
//
//				if (data){
//
//					Lizard.showToast('添加成功, 跳转至借款人详情');
//
//					setTimeout(() => {
//
//						location.href = '/borrowers/' + formData.id;
//
//					},500)
//
//				}
//
//			}
//		})
//
//	},
//
//	getCarModel(typeId){
//
//		var carModelTpl = `
//		<% list.forEach(function(item,index){%>
//		  <dl class="carList">
//        <dt><a href="javascript:;"><%-item.year%> 款</a></dt>
//        <% item.results.forEach(function(child,cIndex){%>
//				  <dd data-modelid="<%-child.id%>" class="<%if(index==0 && cIndex==0){%>active<%}%>"><a href="javascript:;"><%-child.name%></a></dd>
//				<%})%>
//      </dl>
//    <%})%>`;
//
//		Lizard.ajax({
//			type:'POST',
//			url:'/borrowers/carModel',
//			data:{
//				typeId
//			},
//			success:(data) =>{
//
//				var results = data.results;
//
//				if (data && results.length) {
//
//					var list = this.getGroupArr(results,'year');
//
//
//					var carModelHtml = ejs.render(carModelTpl,{list});
//
//
//					$('#carModel').html(carModelHtml);
//
//					$('#modelName').val(list[0].results[0].name);
//
//				}
//			}
//		})
//	},
//
//	getCarType(brandId){
//
//		var carTypeTpl = `
//		<% list.forEach(function(item,index){%>
//		  <dl class="carList">
//        <dt><a href="javascript:;"><%-item.group_name%></a></dt>
//        <% item.results.forEach(function(child,cIndex){%>
//				  <dd data-typeid="<%-child.id%>" class="<%if(index==0 && cIndex==0){%>active<%}%>"><a href="javascript:;"><%-child.name%></a></dd>
//				<%})%>
//      </dl>
//    <%})%>`;
//
//		Lizard.ajax({
//			type:'POST',
//			url:'/borrowers/carType',
//			data:{
//				brandId
//			},
//			success:(data) =>{
//
//				var results = data.results;
//
//
//				if (data && results.length) {
//
//					var list = this.getGroupArr(results,'group_name');
//
//					var carTypeHtml = ejs.render(carTypeTpl,{list});
//
//					$('#carType').html(carTypeHtml);
//
//					$('#typeName').val(list[0].results[0].name);
//
//					this.getCarModel(results[0].id);
//				}
//			}
//		})
//	},
//
//	getBrandList(){
//
//		var letterTpl = `
//			<% letterNav.forEach(function(item){%>
//				<li data-initial="<%-item%>"><a href="javascript:;"><%-item%></a></li>
//			<%})%>`;
//
//		var brandTpl = `
//		<% list.forEach(function(item,index){%>
//		  <dl class="carList" id="letter-<%-item.initial%>">
//        <dt><a href="javascript:;"><%-item.initial%></a></dt>
//        <% item.results.forEach(function(child,cIndex){%>
//				  <dd data-brandid="<%-child.id%>" class="<%if(index==0 && cIndex==0){%>active<%}%>"><a href="javascript:;"><%-child.name%></a></dd>
//				<%})%>
//      </dl>
//    <%})%>`;
//
//		Lizard.ajax({
//			type:'POST',
//			url:'/borrowers/brand',
//			success:(data) =>{
//
//				var results = data.results;
//
//				if (data && results.length) {
//
//					var letterNav = [];
//
//					results.forEach((item, i) => {
//
//						if (letterNav.indexOf(item.initial) === -1) {
//
//							letterNav.push(item.initial)
//						}
//
//					})
//
//					var list = this.getGroupArr(results,'initial');
//
//					var letterHtml = ejs.render(letterTpl, {letterNav});
//
//					var brandHtml = ejs.render(brandTpl,{list});
//
//					$('.carNav_list').html(letterHtml);
//
//					$('#brandList').html(brandHtml);
//
//					$('#brandName').val(list[0].results[0].name);
//
//					this.getCarType(results[0].id);
//				}
//			}
//		})
//	}
//})