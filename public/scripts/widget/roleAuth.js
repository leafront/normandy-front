var popup = require('./popup');

var ejs = require('../lib/ejs');

var Vue = require('../lib/vue');

var roleAuth = {

	adminRole: [],

	adminAuthority(url){ //获取所有角色

		Lizard.ajax({
			url: url,
			type: 'GET',
			async: false,
			success: (data) =>{

				if (data && data.results) {

					this.adminRole = data.results;

				}

			}
		})
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


		var hasRole = this.adminRole.filter(function(item){

			return diffRoleId.indexOf(item.id) > -1;

		})


		this.editRole = editRoleList;

		this.hasRole = hasRole;
	},
	editRole (roleId,url,type){ //获取当前编辑的权限

		Lizard.ajax({
			url:url,
			type:'GET',
			data:{
				roleId:roleId
			},
			success:(data) =>{

				var roleList = data[type];

				if (data && roleList ) {

					roleAuth.renderEditAuth.call(this,roleList);

				}
			}
		})
	},
	submitRole (type,url,roleIds,submitType){ //提交角色修改

		var tips = type == 1 ? '修改' : '添加';

		Lizard.ajax({
			url: url,
			type: submitType,
			data: roleIds,
			success (data) {

				Lizard.showToast(tips + '成功');

				setTimeout(function(){

					//location.reload();

				},500)
			}
		})
	}
}

module.exports = roleAuth;

