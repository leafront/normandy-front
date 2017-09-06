var common = require('../common');

var Lizard = require('../widget/lizard');

var popup = require('../widget/popup');

var roleAuth = require('../widget/roleAuth');

var validate = require('../widget/validate');

var pagination = require('../widget/pagination');

var Vue = require('../lib/vue');


var vueConfig = new Vue({
	el: '#app',
	data: {

		adminRole:[],

		hasRole: [],

		editRole:[],

		roleId:''
	},

	created () {

		roleAuth.adminAuthority.call(this,'/api/admins/permissions');

	},

	mounted () {

		common.headerMenu();

	},

	methods: {

		addAuthority (ele) {

			popup.showContent(ele);

		},

		sendMessage (id){

			Lizard.ajax({
				type:'POST',
				url:`/api/users/${id}/activation`,
				success:function(data){

					if (data && data.key) {

						Lizard.showToast('发送成功');
					}
				}
			})

		},

		editAuthority (ele,roleId) {

			popup.showContent(ele);

			this.roleId = roleId;

			roleAuth.editRole.call(this,roleId,`/api/admins/roles/${roleId}/permissions`,'results');
		},

		deleteRole(roleId){ //删除角色

			Lizard.prompt({
				tips:'确定要删除该角色吗?',
				btn:['确定','取消']
			},() => {
				Lizard.ajax({
					url: `/api/admins/roles/${roleId}`,
					type: 'DELETE',
					data: {
						roleId:roleId
					}
				}).then((data) => {

					if (data){

						Lizard.showToast('删除成功');

						location.reload();
					}

				})
			})
		}

	}

})


var addPopup = new Vue ({

	el: '#addPopup',
	data: {
		addRole:[],
		name: ''
	},

	computed: {

		adminRole () {

			return vueConfig.adminRole

		}
	},
	methods: {

		selectRole (index) {

			var item = this.adminRole.splice(index,1);

			this.addRole.push(item[0]);

		},

		deleteRole (index) {


			var item = this.addRole.splice(index,1);

			this.adminRole.push(item[0]);

		},

		hidePopup (el) {

			popup.hideContent(el);

		},
		addSubmit(roleType){

			var roleIds = [];

			this.addRole.forEach((item) => {

				roleIds.push(item.id);

			})

			var name = this.name;

			if (!name) {

				Lizard.showToast('请输入姓名');

				return;

			}

			var data = {name, permissions: roleIds};

			var type = 2;

			roleAuth.submitRole(type,'/api/admins/roles',data,'POST');
		}

	}
})


var editPopup = new Vue ({

	el: '#editPopup',
	computed: {

		hasRole () {

			return vueConfig.hasRole;

		},

		editRole () {

			return vueConfig.editRole;
		},

		roleId () {

			return vueConfig.roleId;
		}
	},

	methods: {

		selectRole (index) {

			var item = this.hasRole.splice(index,1);

			this.editRole.push(item[0]);

		},

		deleteRole (index) {

			var item = this.editRole.splice(index,1);

			this.hasRole.push(item[0]);

		},

		hidePopup (el) {

			popup.hideContent(el);

		},
		editSubmit(){

			var id = this.roleId;

			var roleIds = [];

			this.editRole.forEach((item) => {

				roleIds.push(item.id);

			})

			var data = {id:id,permissions:roleIds};

			var type = 1;

			roleAuth.submitRole(type,`/api/admins/roles/${id}/permissions`,data,'PATCH');
		}

	}
})

