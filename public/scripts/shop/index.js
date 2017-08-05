
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');


common.headerMenu();

function showPage(){

	var showPage = 5;

	$('.pagination_list').on('click','.js_page',function(e){

		e.preventDefault();

		var href = $(this).attr('href');

		var page = href.split('?')[1];

		if (history.pushState) {

			history.pushState(null,null,href);

		}

		var currentPage = parseInt(page.split('=')[1]);

		Lizard.ajax({
			type: 'POST',
			url: '/shop/list',
			data:{
				page:currentPage
			},
			success: function (data) {

				var totalPage = data.total_page;

				var pageSize = data.page_size;

				var totalCount = data.total_count;

				var iPage = common.getPage(currentPage,showPage);

				var shopList = data.results;

				var pagination = {
					showPage:showPage,
					totalPage:totalPage,
					page:currentPage,
					iPage:iPage,
					pathName:location.pathname,
					isFirstPage: (currentPage - 1 ) == 0,
					isLastPage: currentPage * pageSize > totalCount
				}

				var html = ejs.render(paginationTpl,pagination);

				$('.pagination_list').html(html);

				var listHtml = ejs.render(listTpl,{shopList:shopList});

				$('.cont_list').html(listHtml);

			}
		})
	})
}

function showProvinces(){

	var tpl = '\
		<% list.forEach(function(item){%>\
		<li data-id="<%-item.province_id%>">\
			<a href="javascript:;"><%-item.province_name%></a>\
		</li>\
		<%})%>';

	Lizard.ajax({
		type:'POST',
		url:'/shop/provinces',
		success:function(data){

			var list = data.results;

			var html = ejs.render(tpl,{list:list});

			$('.shop_province').html(html);

			getCityist(list[0].province_id);

			$('.js_province').text(list[0].province_name);


		}
	})
}

function showCitys(){

	$('.shop_province').on('click','li',function(){

		var id = $(this).data('id');

		getCityist(id);

	})

}

function getCityist(id){

	var tpl = '\
		<% list.forEach(function(item){%>\
		<li data-item=<%-JSON.stringify(item)%>>\
			<a href="javascript:;"><%-item.city_name%></a>\
		</li>\
		<%})%>';

	Lizard.ajax({
		type:'POST',
		url:'/shop/citys',
		async:false,
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

}


function showContent(ele){ //显示弹层


	$('.popup_mask').addClass('active');

	$(ele).addClass('active');

	$('body').addClass('overflow');


}

function hideContent(ele){ //隐藏弹层

	$('.popup_mask').removeClass('active');

	$(ele).removeClass('active');

	$('body').removeClass('overflow');

}

function showPopup(){

	$('.js_edit').click(function(){

		var id = $(this).data('id');

		$('.js_editConfirm').data('id',id);

		getShopEdit(id);

	})


	$('.js_cancel').click(function(){ //取消

		var popup = $(this).data('popup');

		hideContent(popup);

	})

	$('.shop_city').each(function(){

		$(this).on('click','li',function(){

			var item = $(this).data('item');

			$(this).parent().prev('.js_city').data('item',item);

		})
	})


	$('.js_add').click(function(){ //添加

		showContent('#addPopup');

	})



	$('.js_editConfirm').click(function(){

		var id = $(this).data('id');

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

		submitShop(url,data);

	})

	$('.js_addConfirm').click(function(){

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

		submitShop(url,data);
	})
}

function getShopEdit(id){

	Lizard.ajax({
		type:'POST',
		url:'/shop/edit',
		data:{
			id:id
		},
		success:function(data){

			var area = data.area;

			$('#edit_name').val(data.name);

			$('#edit_abbreviation').val(data.short_name);

			$('#js_editProvince').text(area.province_name);


			$('#edit_address').val(data.address);

			$('#createTime').val(data.created_at);

			$('#isActive').val(data.is_active);

			$('#edit_phone').val(data.phone);

			getCityist(area.province_id);

			$('#js_editCity').text(area.city_name).data('item',area);


			showContent('#editPopup');


		}
	})
}

function submitShop(url,data){

	Lizard.ajax({
		type:'POST',
		url:url,
		data:data,
		success:function(data){


		}
	})

}
common.dropMenu();

showPopup();

showCitys();

showProvinces();
showPage();

