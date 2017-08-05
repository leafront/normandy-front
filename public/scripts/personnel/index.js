var $ = require('../lib/jquery');

var common = require('../common');


var Lizard = require('../widget/lizard');


common.headerMenu();

var adminRole = null;

var tpl = '\
<% list.forEach(function(item){%>\
	<li data-id="<%-item.id%>">\
		<a href="javascript:;"><%-item.name%></a>\
	</li>\
<%})%>';

function showPage(){ //显示翻页

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
			url: '/personnel/list',
			data:{
				page:currentPage
			},
			success: function (data) {

				var totalPage = data.total_page;

				var pageSize = data.page_size;

				var totalCount = data.total_count;

				var iPage = common.getPage(currentPage,showPage);

				var userList = data.results;

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

				var listHtml = ejs.render(listTpl,{userList:userList});

				$('.cont_list').html(listHtml);

			}
		})

	})
}

function showPopup(){ //显示弹层

	$('.cont_list').on('click','.js_authEdit',function(){

		var roleId = $(this).data('id');

		$('.js_editConfirm').data('id',roleId);

		editRole(roleId);

	})

	$('.js_cancel').click(function(){  //取消

		var popup = $(this).data('popup');

		hideContent(popup);

	})

	$('.popup_mask').click(function(){ //弹层消失

		hideContent('.popup_wraper');

	})

	$('.js_editConfirm').click(function(){ //确认提交

		var id = $(this).data('id');

		var roleType = $(this).data('roletype');

		var roleIds = getRoleIds(roleType);

		var url = '/personnel/edit';

		var data = {id:id,roles:roleIds};

		var type = 1;

		submitRole(type,url,data);

	})


	$('.js_add').click(function(){ //添加角色

		renderAddAuth();

	})

	$('.cont_list').on('click','.js_message',function(){

		var id = $(this).data('id');

		sendMessage(id);

	})

	$('.js_addConfirm').click(function(){

		var roleType = $(this).data('roletype');

		var roleIds = getRoleIds(roleType);

		var roleName = $.trim($('#roleName').val());

		var mobile = $.trim($('#mobile').val());

		if (!roleName) {

			Lizard.showToast('请输入姓名');

			return;

		}

		if (!mobile) {

			Lizard.showToast('请输入手机号');

			return;

		}
		if(!Lizard.isMobile(mobile)){

			Lizard.showToast('请输入正确的手机号');

			return;

		}

		var data = {name:roleName,mobile:mobile,roles:roleIds};

		var url = '/personnel/add';

		var type = 2;

		submitRole(type,url,data);

	})
}

function hideContent(ele){ //隐藏弹层

	$('.popup_mask').removeClass('active');

	$(ele).removeClass('active');

	$('body').removeClass('overflow');

}
function renderEditAuth(editRoleList){ //获取所有角色

	var editRoleId = [];

	editRoleList.forEach(function(item){

		editRoleId.push(item.id);

	})

	var allRoleId = [];

	adminRole.forEach(function(item){

		allRoleId.push(item.id);

	})

	var  diffRoleId = Lizard.diffArray(allRoleId,editRoleId);

	var adminRoleData = adminRole.filter(function(item){

		return diffRoleId.indexOf(item.id) > -1;

	})

	var html = ejs.render(tpl,{list:adminRoleData});

	$('#popup_has_role').html(html);
}

function getRoleIds(ele){ //获取角色id

	var roleIds = [];

	$(ele + ' li').each(function(){

		var permissions = $(this).data('id');

		roleIds.push(permissions);

	})

	return roleIds;

}

function showSwitch(){ //开启启用和禁用

	$('.cont_list').on('click','.js_switch',function(){

		var status = $(this).data('status');

		var id = $(this).data('id');

		if (status == 1 || status == 0) {

			status = 2;

		} else {

			status = 1;
		}

		var tipTxt = status == 1 ? '启用' : '禁用';

		Lizard.prompt({
			tips:'确定'+tipTxt+'该员工吗?',
			btn:['确定','取消']
		},function(){
			Lizard.ajax({
				url: '/personnel/role/switch',
				type: 'POST',
				data: {
					status:status,
					id:id
				},
				success:function(data){

					if (data){

						Lizard.showToast(tipTxt + '成功');

						location.reload();
					}
				}
			})
		})
	})

}

function adminAuthority(){ //获取所有角色

	Lizard.ajax({
		url:'/personnel/role',
		type:'POST',
		async:false,
		success:function(data){

			if (data && data.results){

				adminRole = data.results;

			}

		}
	})
}

function editRole (roleId){  //获取当前角色
	Lizard.ajax({
		url:'/personnel/edit/roles',
		type:'POST',
		data:{
			id:roleId
		},
		success:function(data){

			var roleList = data.roles;

			if (data && roleList ) {

				renderEditAuth(roleList);

				var html = ejs.render(tpl,{list:roleList});

				$('#popup_edit_role').html(html);

				showContent('#editPopup');
			}

		}
	})
}

function showContent(ele){ //显示弹层


	$('.popup_mask').addClass('active');

	$(ele).addClass('active');

	$('body').addClass('overflow');


}
function selectRole() { //角色选项选中

	$('.popup_admin').each(function(index){

		$(this).on('click', 'li', function () {

			var html = $(this).prop('outerHTML');

			$('.popup_role').eq(index).append(html);

			$(this).remove();

		})

	})

	$('.popup_role').each(function(index){

		$(this).on('click', 'li', function () {

			var html = $(this).prop('outerHTML');

			$('.popup_admin').eq(index).append(html);

			$(this).remove();

		})
	})
}

function renderAddAuth(){

	var html = ejs.render(tpl,{list:adminRole});

	$('#popup_all_role').html(html);

	showContent('#addPopup');
}
function submitRole(type,url,roleIds){ //提交角色修改

	var tips = type == 1 ? '修改' : '添加';

	Lizard.ajax({
		url: url,
		type: 'POST',
		data: roleIds,
		success: function (data) {

			Lizard.showToast(tips + '成功');

			setTimeout(function(){

				location.reload();

			},500)
		}
	})
}

function sendMessage(id){

	Lizard.ajax({
		type:'POST',
		url:'/personnel/activation',
		data:{
			id:id
		},
		success:function(data){

			if (data && data.key) {

				Lizard.showToast('发送成功');
			}
		}
	})

}

adminAuthority();

showSwitch();

showPopup();

showPage();

selectRole();


