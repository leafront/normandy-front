
require([
	'../config'
], function() {
	require([
		'jquery',
		'common',
		'Lizard'
	], function (
		$,
		common,
		Lizard
	) {

		common.headerMenu();

		var tpl = '<% list.forEach(function(item){%>\
    <li data-id="<%-item.id%>">\
    <a href="javascript:;"><%-item.name%></a>\
    </li>\
    <%})%>';

		var adminRole = null;

	  function showPopup(){

			$('.js_authEdit').click(function(){ //编辑权限

				var roleId = $(this).data('id');

				editRole(roleId);

				$('.js_editConfirm').data('id',roleId);

			})

			$('.js_cancel').click(function(){ //取消

				var popup = $(this).data('popup');

				hideContent(popup);

			})

			$('.popup_mask').click(function(){ //弹层消失

				hideContent('.popup_wraper');

			})

			$('.js_editConfirm').click(function(){ //编辑权限修改

			  var id = $(this).data('id');

				var roleType = $(this).data('roletype');

				var roleIds = getRoleIds(roleType);

				var url = '/authority/edit';

				var type = 1;

				submitRole(type,url,{id:id,permissions:roleIds});

			})

			$('.js_addConfirm').click(function(){ //添加权限修改

			  var roleType = $(this).data('roletype');

				var roleIds = getRoleIds(roleType);

				var roleName = $.trim($('#roleName').val());

				if (!roleName) {

					Lizard.showToast('请输入角色名称');

					return;

				}

				var url = '/authority/add';

				var type = 2;

				submitRole(type,url,{name:roleName,permissions:roleIds});

			})

			$('.js_delete').click(function(){ //删除权限

				var roleId = $(this).data('id');

				deleteRole(roleId);

			})

			$('.js_add').click(function(){ //添加权限

				renderAddAuth();

			})
		}

		function getRoleIds(ele){ //获取权限id

			var roleIds = [];

			$(ele + ' li').each(function(){

				var permissions = $(this).data('id');

				roleIds.push(permissions);

			})

			return roleIds;

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

		function renderEditAuth(editRoleList){ //获取所有权限

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
		function adminAuthority(){ //获取所有角色

			Lizard.ajax({
				url:'/authority/admin',
				type:'POST',
				async:false,
				success:function(data){

					if (data && data.results){

						adminRole = data.results;

					}

				}
			})
		}
		function renderAddAuth(){

			var html = ejs.render(tpl,{list:adminRole});

			$('#popup_all_role').html(html);

			showContent('#addPopup');
		}
		function selectRole() { //权限选项选中

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

		function editRole (roleId){ //获取当前编辑的权限

			Lizard.ajax({
				url:'/authority/edit/roles',
				type:'POST',
				data:{
					roleId:roleId
				},
				success:function(data){

					var roleList = data.results;

					if (data && roleList ) {

						renderEditAuth(roleList);

						var html = ejs.render(tpl,{list:roleList});

						$('#popup_edit_role').html(html);

						showContent('#editPopup');

						$('.popup_container').show();

					}
				}
			})
		}

		function submitRole(type,url,roleIds){ //提交权限修改

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

		function deleteRole(roleId){ //删除角色

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

		adminAuthority();
		showPopup();
		selectRole();
	})
})
