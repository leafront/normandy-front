var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var popup = require('../widget/popup');

var roleAuth = require('../widget/roleAuth');

var Page = require('../widget/page');

var pagination = require('../widget/pagination');

var listTpl =  require('./templates/list');

Page({

	ajax(){

		roleAuth.adminAuthority({url:'/personnel/role'});

	},

	onShow(){

		common.headerMenu();


	},
	bindEvents(){

		$('.pagination_list').on('click','.js_page',(event) => {

			pagination.showPage(event,'/personnel/list', null, listTpl, null);

		})

		this.showSwitch();

		this.pageAction();


	},

	pageAction(){

		var This = this;

		$('.js_addConfirm').click(function(){

			var roleType = $(this).data('roletype');

			This.addSubmit(roleType);

		})

		$('.cont_list').on('click','.js_authEdit',function(){

			var roleId = $(this).data('id');

			$('.js_editConfirm').data('id',roleId);

			roleAuth.editRole(roleId,'/personnel/edit/roles','roles');

		})

		$('.js_cancel').click(function(){  //取消

			var popupEle = $(this).data('popup');

			popup.hideContent(popupEle);

		})

		$('.popup_mask').click(function(){ //弹层消失

			popup.hideContent('.popup_wraper');

		})

		$('.js_editConfirm').click(function(){ //确认提交

			var id = $(this).data('id');

			var roleType = $(this).data('roletype');

			This.editSubmit(id,roleType);
		})


		$('.js_add').click(() => { //添加角色

			roleAuth.renderAddAuth();

		})

		$('.cont_list').on('click','.js_message',function(){

			var id = $(this).data('id');

			This.sendMessage(id);

		})
		roleAuth.selectRole();
	},
	showSwitch(){ //开启启用和禁用

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
	},

	sendMessage(id){
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

	},


	editSubmit(id,roleType){

		var roleIds = roleAuth.getRoleIds(roleType);

		var url = '/personnel/edit';

		var data = {id:id,roles:roleIds};

		var type = 1;

		roleAuth.submitRole(type,url,data);
	},
	addSubmit(roleType){

		var roleIds = roleAuth.getRoleIds(roleType);

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

		roleAuth.submitRole(type,url,data);
	}
})
