
var $ = require('../../lib/jquery');

var common = require('../../common');

var Lizard = require('../../widget/lizard');

var popup = require('../../widget/popup');

var Page = require('../../widget/page');


Page({

	ajax(){

		this.getBrandList();

	},

	onShow(){

		common.headerMenu();

		common.dropMenu();

	},
	bindEvents(){

		var This  = this;

		$('.carNav_list').on('click','li',function(){

			var initial = $(this).data('initial');


			document.getElementById('letter-' + initial).scrollIntoView();

		})

		$('#brandList').on('click','dd',function(){

			var brandId = $(this).data('brandid');

			This.getCarType(brandId);

		})

		$('#carType').on('click','dd',function(){

			var typeId = $(this).data('typeid');

			This.getCarModel(typeId);

		})

		$('#js_brand').click(function(){

			popup.showContent('#carPopup')

		})


		$('.js_cancel').click(function(){

			popup.hideContent('#carPopup')

		})

		this.selectType();

	},

	selectType(){

		$('.shiftingType').click(function(){

			$(this).addClass('active').siblings().removeClass('active');

		})

		$('.driverType').click(function(){

			$(this).addClass('active').siblings().removeClass('active');

		})


	},

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

	getCarModel(typeId){

		var carModelTpl = `
		<% list.forEach(function(item){%>
		  <dl class="carList">
        <dt><a href="javascript:;"><%-item.year%> 款</a></dt>
        <% item.results.forEach(function(child){%>
				  <dd data-modelid="<%-child.id%>"><a href="javascript:;"><%-child.name%></a></dd>
				<%})%>
      </dl>
    <%})%>`;

		Lizard.ajax({
			type:'POST',
			url:'/borrowers/carModel',
			data:{
				typeId
			},
			success:(data) =>{

				var results = data.results;

				if (data && results.length) {

					var list = this.getGroupArr(results,'year');


					var carModelHtml = ejs.render(carModelTpl,{list});


					$('#carModel').html(carModelHtml);

				}
			}
		})
	},

	getCarType(brandId){

		var carTypeTpl = `
		<% list.forEach(function(item){%>
		  <dl class="carList">
        <dt><a href="javascript:;"><%-item.group_name%></a></dt>
        <% item.results.forEach(function(child){%>
				  <dd data-typeid="<%-child.id%>"><a href="javascript:;"><%-child.name%></a></dd>
				<%})%>
      </dl>
    <%})%>`;

		Lizard.ajax({
			type:'POST',
			url:'/borrowers/carType',
			data:{
				brandId
			},
			success:(data) =>{

				var results = data.results;


				if (data && results.length) {

					var list = this.getGroupArr(results,'group_name');

					var carTypeHtml = ejs.render(carTypeTpl,{list});

					$('#carType').html(carTypeHtml);

					this.getCarModel(results[0].id);
				}
			}
		})
	},

	getBrandList(){

		var letterTpl = `
			<% letterNav.forEach(function(item){%>
				<li data-initial="<%-item%>"><a href="javascript:;"><%-item%></a></li>
			<%})%>`;

		var brandTpl = `
		<% list.forEach(function(item){%>
		  <dl class="carList" id="letter-<%-item.initial%>">
        <dt><a href="javascript:;"><%-item.initial%></a></dt>
        <% item.results.forEach(function(child){%>
				  <dd data-brandid="<%-child.id%>"><a href="javascript:;"><%-child.name%></a></dd>
				<%})%>
      </dl>
    <%})%>`;

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


					var letterHtml = ejs.render(letterTpl, {letterNav});


					var brandHtml = ejs.render(brandTpl,{list});


					$('.carNav_list').html(letterHtml);

					$('#brandList').html(brandHtml);


					this.getCarType(results[0].id);
				}
			}
		})
	}
})