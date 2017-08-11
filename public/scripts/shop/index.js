
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');


var popup = require('../widget/popup');


var Page = require('../widget/page');

var pagination = require('../widget/pagination');


Page({

	ajax(){

		this.showProvinces();

	},
	onShow(){

		common.headerMenu();

		common.dropMenu();

	},
	bindEvents(){

		var This = this;

		pagination.showPage('/shop/list');

		$('.shop_province').on('click','li',function(){

			var id = $(this).data('id');

			This.getCityList(id);

		})

		$('.js_editConfirm').click(function(){

			var id = $(this).data('id');

			This.editShopList(id);

		})

		$('.js_addConfirm').click(function(){

			This.addShopList();

		})


		$('.js_edit').click(function(){

			var id = $(this).data('id');

			$('.js_editConfirm').data('id',id);

			This.getShopEdit(id);

		})


		$('.js_cancel').click(function(){ //取消

			var popupEle= $(this).data('popup');

			popup.hideContent(popupEle);

		})

		$('.shop_city').each(function(){

			$(this).on('click','li',function(){

				var item = $(this).data('item');

				$(this).parent().prev('.js_city').data('item',item);

			})
		})


		$('.js_add').click(function(){ //添加

			popup.showContent('#addPopup');

		})

	},
	showProvinces (){
		var tpl = `
			<% list.forEach(function(item){%>
			<li data-id="<%-item.province_id%>">
				<a href="javascript:;"><%-item.province_name%></a>
			</li>
			<%})%>`;

		Lizard.ajax({
			type:'POST',
			url:'/shop/provinces',
			success:(data) => {

				var list = data.results;

				var html = ejs.render(tpl,{list:list});

				$('.shop_province').html(html);

				this.getCityList(list[0].province_id);

				$('.js_province').text(list[0].province_name);

			}
		})
	},
	getCityList(id){

		var tpl =`
			<% list.forEach(function(item){%>
			<li data-item=<%-JSON.stringify(item)%>>
				<a href="javascript:;"><%-item.city_name%></a>
			</li>
			<%})%>`;

		Lizard.ajax({
			type:'POST',
			url:'/shop/citys',
			data:{
				id: id
			},
			success:function(data){

				var list = data.results;

				var html = ejs.render(tpl,{list:list});

				$('.shop_city').html(html);

				$('.js_city').text(list[0].city_name).addClass('active').data('item',list[0]);


			}
		})

	},

	getShopEdit(id){

		Lizard.ajax({
			type:'POST',
			url:'/shop/edit',
			data:{
				id:id
			},
			success:(data) => {

				var area = data.area;

				$('#edit_name').val(data.name);

				$('#edit_abbreviation').val(data.short_name);

				$('#js_editProvince').text(area.province_name);


				$('#edit_address').val(data.address);

				$('#createTime').val(data.created_at);

				$('#isActive').val(data.is_active);

				$('#edit_phone').val(data.phone);

				this.getCityList(area.province_id);

				$('#js_editCity').text(area.city_name).data('item',area);


				popup.showContent('#editPopup');


			}
		})
	},
	editShopList(id){

		var url = '/shop/edit/list';

		var name = $.trim($('#edit_name').val());

		var abbreviation = $.trim($('#edit_abbreviation').val());

		var address = $.trim($('#edit_address').val());

		var phone = $.trim($('#edit_phone').val());

		var item = $('#js_editCity').data('item');

		var createTime = $('#createTime').val();

		var is_active = $('#isActive').val();



		if (!name) {

			Lizard.showToast('请输入门店名称');

			return;
		}


		if (!abbreviation) {

			Lizard.showToast('请输入门店简称');

			return;
		}

		if (!address) {

			Lizard.showToast('请输入电话');

			return;
		}

		if (!phone) {

			Lizard.showToast('请输入电话');

			return;
		}

		var data = {

			city: item.city_id,
			name:name,
			area:item,
			created_at:createTime,
			address:address,
			id:id,
			is_active:is_active,
			phone:phone,
			short_name:abbreviation
		}

		var type = 1;

		this.submitShop(type,url,data);
	},

	addShopList:function(){

		var name = $.trim($('#add_name').val());

		var abbreviation = $.trim($('#add_abbreviation').val());

		var address = $.trim($('#add_address').val());

		var phone = $.trim($('#add_phone').val());

		var admin_phone = $.trim($('#add_adminPhone').val());

		var admin_name = $.trim($('#add_adminName').val());

		var item = $('#js_editCity').data('item');


		var data = {

			city:item.city_id,
			name:name,
			short_name:abbreviation,
			address:address,
			phone:phone,
			admin_phone:admin_phone,
			admin_name:admin_name

		}

		var url = '/shop/add/list';

		var type = 2;

		this.submitShop(type,url,data);
	},
	submitShop(type,url,data){

		var tips = type == 1 ? '修改' : '添加';

		Lizard.ajax({
			type:'POST',
			url:url,
			data:data,
			success:function(data){

				Lizard.showToast(tips + '成功');

				setTimeout(function(){

					location.reload();

				},500)
			}
		})
	}
})
