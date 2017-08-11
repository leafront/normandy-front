
var $ = require('../lib/jquery');

var popup = require('./popup');

var roleAuth = {

	adminRole: null,

	template(){

		var tpl =`
		<% list.forEach(function(item){%>
			<li data-id="<%-item.id%>">
		<a href="javascript:;"><%-item.name%></a>
		</li>
		<%})%>`;

		return tpl;

	},

	renderEditAuth (editRoleList){ //获取所有权限

		var editRoleId = [];

		editRoleList.forEach(function(item){

			editRoleId.push(item.id);

		})

		var allRoleId = [];

		this.adminRole.forEach(function(item){

			allRoleId.push(item.id);

		})

		var  diffRoleId = Lizard.diffArray(allRoleId,editRoleId);

		var adminRoleData = this.adminRole.filter(function(item){

			return diffRoleId.indexOf(item.id) > -1;

		})

		var html = ejs.render(this.template(),{list:adminRoleData});

		$('#popup_has_role').html(html);
	},
	getRoleIds(ele){ //获取权限id

		var roleIds = [];

		$(ele + ' li').each(function(){

			var permissions = $(this).data('id');

			roleIds.push(permissions);

		})

		return roleIds;

	},
	renderAddAuth (){

		var html = ejs.render(this.template(),{list:this.adminRole});

		$('#popup_all_role').html(html);

		popup.showContent('#addPopup');
	},
	submitRole (type,url,roleIds){ //提交角色修改

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
	},
	adminAuthority({url}){ //获取所有角色

		Lizard.ajax({
			url: url,
			type: 'POST',
			async: false,
			success: (data) =>{

				if (data && data.results) {

					this.adminRole = data.results;

				}

			}
		})
	},
	editRole (roleId,url,type){ //获取当前编辑的权限

		Lizard.ajax({
			url:url,
			type:'POST',
			data:{
				roleId:roleId
			},
			success:(data) =>{


				var roleList = data[type];

				if (data && roleList ) {

					roleAuth.renderEditAuth(roleList);

					var html = ejs.render(this.template(),{list:roleList});

					$('#popup_edit_role').html(html);



					popup.showContent('#editPopup');

					$('.popup_container').show();

				}
			}
		})
	},
	selectRole () { //角色选项选中

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

}

module.exports = roleAuth;

