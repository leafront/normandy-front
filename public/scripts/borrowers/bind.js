var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var Page = require('../widget/page');


Page({

	onShow(){

		common.headerMenu();

	},
	bindEvents(){

		$('.js_submit').click(() =>{

			this.bindBorrowers();

		})

		$('.js_cancel').click(() =>{

			location.href = '/borrowers';
		})
	},
	bindBorrowers(){

		var id_no = $.trim($('#card').val());

		if (!id_no) {

			Lizard.showToast('请输入身份证号');

			return;

		}

		if (!Lizard.isIdCard(id_no)){

			Lizard.showToast('请输入正确的身份证号');

			return;

		}

		var data = {
			id_no
		}

		this.borrowersSubmit(data);

	},
	borrowersSubmit(data){
		Lizard.ajax({
			type:'POST',
			url:'/borrowers/bind',
			data:data,
			success:function(){

				Lizard.showToast('添加成功');

				setTimeout(() =>{

					//location.href = '/borrowers';

				},500)

			}
		})
	}
})


