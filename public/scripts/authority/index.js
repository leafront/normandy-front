var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var popup = require('../widget/popup');

var roleAuth = require('../widget/roleAuth');

var Page = require('../widget/page');

Page({

	ajax(){

		roleAuth.adminAuthority({url:'/authority/admin'});

	},

	onShow(){

		common.headerMenu();

		roleAuth.selectRole();

	},
	bindEvents(){

		var This = this;

		$('.js_authEdit').click(function(){ //编辑权限

			var roleId = $(this).data('id');

			$('.js_editConfirm').data('id',roleId);

			roleAuth.editRole(roleId,'/authority/edit/roles','results');

		})

		$('.js_cancel').click(function(){ //取消

			var popupEle = $(this).data('popup');

			popup.hideContent(popupEle);

		})

		$('.popup_mask').click(function(){ //弹层消失

			popup.hideContent('.popup_wraper');

		})

		$('.js_editConfirm').click(function(){ //编辑权限修改

			var id = $(this).data('id');

			var roleType = $(this).data('roletype');

			This.editSubmit({id,roleType});

		})

		$('.js_addConfirm').click(function(){ //添加权限修改

			var roleType = $(this).data('roletype');

			This.addSubmit(roleType);


		})

		$('.js_delete').click(function(){ //删除权限

			var roleId = $(this).data('id');

			This.deleteRole(roleId);

		})

		$('.js_add').click(function(){ //添加权限

			roleAuth.renderAddAuth();

		})

		roleAuth.selectRole();

	},

	editSubmit({id,roleType}){


		var roleIds = roleAuth.getRoleIds(roleType);

		var url = '/authority/edit';

		var type = 1;

		roleAuth.submitRole(type,url,{id:id,permissions:roleIds});

	},

	addSubmit(roleType){


		var roleIds = roleAuth.getRoleIds(roleType);

		var roleName = $.trim($('#roleName').val());

		if (!roleName) {

			Lizard.showToast('请输入角色名称');

			return;

		}

		var url = '/authority/add';

		var type = 2;

		roleAuth.submitRole(type,url,{name:roleName,permissions:roleIds});
	},
	deleteRole(roleId){ //删除角色

		Lizard.prompt({
			tips:'确定要删除该角色吗?',
			btn:['确定','取消']
		},function(){

			Lizard.ajax({
				url: '/authority/delete/role',
				type: 'POST',
				data: {
					roleId:roleId
				},
				success:function(data){

					if (data){

						Lizard.showToast('删除成功');

						location.reload();
					}
				}
			})
		})
	}

})

