
var $ = require('../../../lib/jquery');

var common = require('../../../common');

var baseData = require('../../../../../model/data');

var Lizard = require('../../../widget/lizard');

var Page = require('../../../widget/page');

const {
	condition,
	surfaceStatus,
	purchaseType,
	collateralLastFree,
	certificateType,
	starterStatus,
	engineStatus,
	transmissionStatus,
	exhaustStatus,
	isWorkOk

	} = baseData

Page({

	ajax(){

		this.getVehicleList();

	},

	onShow(){

		common.headerMenu();

	},
	bindEvents(){

		$('.vehicle_cont').on('click','.vehicle_item_drop',function(){

			$(this).toggleClass('active');

			$('.vehicle_tab').toggleClass('active');

		})
	},
	getVehicleList(){

		var id = $('#vehicleId').val();

		Lizard.ajax({
			type:'POST',
			url:'/borrowers/vehicles/list',
			data:{
				id
			},
			success:function(data){

				if (data && data.results.length){

					var html = ejs.render(listTpl, {
						list:data.results,
						condition,
						surfaceStatus,
						purchaseType,
						collateralLastFree,
						certificateType,
						starterStatus,
						engineStatus,
						transmissionStatus,
						exhaustStatus,
						isWorkOk
					})

					$('.vehicle_cont').html(html);

				}

			}
		})
	}
})



