
var common = require('../common');

var Lizard = require('../widget/lizard');

var popup = require('../widget/popup');

var roleAuth = require('../widget/roleAuth');

var validate = require('../widget/validate');

var pagination = require('../widget/pagination');

var Vue = require('../lib/vue');

var listTpl =  require('./templates/list');



var vueConfig = new Vue({
	el: '#app',
	data: {

		adminRole:[],

		hasRole: [],

		editRole:[],

		roleId:''
	},

	created () {

		roleAuth.adminAuthority.call(this,'/api/users/roles');

	},

	mounted () {

		document.querySelector('.pagination_list').addEventListener("click",function(event) {

			if(e.target && e.target.nodeName.toUpperCase == "LI") {

				event.preventDefault();

				pagination.showPage(event,'/api/users', null, listTpl, null);

			}
		})

		common.headerMenu();

	},

	methods: {

		addPersonnel (ele) {

			popup.showContent(ele);

		},

		sendMessage (id){

			Lizard.ajax({
				type:'POST',
				url:`/api/users/${id}/activation`
			}).then((data) => {

				if (data && data.key) {

					Lizard.showToast('发送成功');
				}

			})

		},

		editPersonnel (ele,roleId) {

			popup.showContent(ele);

			this.roleId = roleId;

			roleAuth.editRole.call(this,roleId,`/api/users/${roleId}`,'roles');
		},

		isDisabled (status,id){

			if (status == 1 || status == 0) {

				status = 2;

			} else {

				status = 1;
			}

			var tipTxt = status == 1 ? '启用' : '禁用';

			Lizard.prompt({
				tips:'确定'+tipTxt+'该员工吗?',
				btn:['确定','取消']
			},() => {
				Lizard.ajax({
					url: `/api/users/${id}/status`,
					type: 'PATCH',
					data: {
						status:status
					}
				}).then((data) => {

					if (data){

						Lizard.showToast(tipTxt + '成功');

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
		name: '',
		mobile: ''
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

			var mobile = this.mobile;

			if (!name) {

				Lizard.showToast('请输入姓名');

				return;

			}

			if (!mobile) {

				Lizard.showToast('请输入手机号');

				return;

			}
			if(!validate.isMobile(mobile)){

				Lizard.showToast('请输入正确的手机号');

				return;

			}

			var data = {name, mobile, roles: roleIds};

			var type = 2;

			roleAuth.submitRole(type,'/api/users',data,'POST');
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

		  var data = {id:id,roles:roleIds};

		  var type = 1;

			roleAuth.submitRole(type,`/api/users/${id}/roles`,data,'PATCH');
		}

	}
})
