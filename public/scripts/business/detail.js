var $ = require('../lib/jquery');

var common = require('../common');

var data = require('../../../model/data');

var ejs = require('../lib/ejs');

var Lizard = require('../widget/lizard');

var local = require('../widget/local');

var Page = require('../widget/page');

var approvalTpl = require('./templates/approval');

var creditTpl = require('./templates/credit_list');

var credit = [
	{
		interface_name: 'tongdun_credit',
		name: '同盾个人借款征信',
		src: '同盾',
		is_active: true
	},
	{
		interface_name: 'personal_credit',
		name: '个人信用报告[个人担任法定代表人信息,个人股权投资信息,个人担任高管信息]',
		src: '鹏元',
		is_active: true
	},
	{
		interface_name: 'personal_risk',
		name: '个人风险信息[案例信息,执行信息,失信信息,税务行政执法信息,催欠公告信息,网贷逾期信息]',
		src: '鹏元',
		is_active: true
	},
	{
		interface_name: 'person_card_trans_record',
		name: '卡核实与卡多笔交易记录',
		src: '鹏元',
		is_active: true
	},
	{
		interface_name: 'jiuyao_credit',
		name: '91个人征信',
		src: '91征信',
		is_active: true
	}
];

const {

	borrowingStage,
	borrowingResult,
	borrowingRating,
	carType

	} = data;

Page({

	borrowingsId: location.pathname.match(/[^/]{36}/g).join(''),

	ajax(){

		this.getApprovals();

	},
	onShow(){

		common.headerMenu();

		this.init();


		this.storageContact();

	},

	storageContact(){

		local.set('social_net',window.social_net);

	},
	init(){

		this.getRisks();

		this.getVehiclesRisks();

	},
	bindEvents(){

		this.showTab();

		var This = this;

		$('#creditList').on('click','.btn_buy',function(){

			var { index, interface_name } = $(this).data('query');

			if (credit[index].interface_name !== 'person_card_trans_record'){

				credit[index].is_active = false;

			}

			This.purchaseAction(query);
		})

		this.rotateImg();



	},

	rotateImg() {

		var origin_rotate = 0;

		$('.business_rotate').click(function(event){

			var img = $(this).parent().find('.img_pic');

			var new_rotate = (origin_rotate + 90) % 360;

			img.css('transform', 'rotate('+ new_rotate +'deg)');

			origin_rotate= new_rotate;

		})

	},

	getVehiclesRisks(){

		if (roleList.indexOf('CREDIT_READ') > -1) {

			Lizard.ajax({
				type:'POST',
				url:'/business/vehicles/risks',
				data:{
					id: this.borrowingsId
				},
				success:function(data){

					if(data) {

						var html = ejs.render(creditTpl,{list:credit,risks:data});

						$('#vehicleList').html(html);
					}

				}
			})

		}

	},

	purchaseAction(query){

		Lizard.ajax({
			type:'POST',
			url:'/business/purchase',
			data:{
				id: this.borrowingsId
			},
			success(data){

				if(data) {

					credit[index].is_active = true;

					Lizard.showToast('提交成功');
				}

			},
			error(){

				credit[index].is_active = true;

			}

		})

	},

	seeAction(){

	},

	getRisks(){

		Lizard.ajax({
			type:'POST',
			url:'/business/risks',
			data:{
				id: this.borrowingsId
			},
			success:function(data){

				if(data) {

					var html = ejs.render(creditTpl,{list:credit,risks:data});

					$('#creditList').html(html);
				}

			}
		})

	},

	getApprovals(){

		Lizard.ajax({
			type:'POST',
			url:'/business/approvals',
			data:{
				id: this.borrowingsId
			},
			success:function(data){

				var results = data.results;

				if (data && results.length){

					var html = ejs.render(approvalTpl,{list:results,borrowingStage,borrowingResult,borrowingRating,carType});

					$('#approvals').html(html);
				}

			}
		})
	},
	showTab(){

		$('.business_menu li').click(function(){

			var index = $(this).index();

			$(this).addClass('active').siblings().removeClass('active');

			$('.business_tab').eq(index).addClass('active').siblings('.business_tab').removeClass('active');

		})
	}
})