
window.$ = require('../../../lib/jquery');

var common = require('../../../common');

var baseData = require('../../../../../model/data');

var Lizard = require('../../../widget/lizard');

var Calendar = require('../../../widget/calendar');

var Page = require('../../../widget/page');

Page({

	onShow(){

		common.headerMenu();

		common.dropMenu();

		this.widgetCalendar();
	},
	bindEvents(){

		this.selectType();

		this.carConditionAction();

	},

	widgetCalendar(){

		var calendarEle = ['#buyTime','#transferTime','#registrationTime','#insuranceTime'];

		calendarEle.forEach((item) =>{

			var calendarItem = new Calendar({
				startYear: 2000,
				yearNum:5,
				ele:item
			})

			calendarItem.showCalendar();

		})

	},

	carConditionAction(){

		$('.js_submit').click(() => {

			const isValidate = this.validateForm();

			console.log(isValidate)

			const data = this.getFormData();

			console.log(data);

			if (isValidate) {

				this.submitVehicle(data);

			}

		})

	},
	submitCarCondition(formData){

		var vehicleId = $('#vehicleId').val();

		var detailId = $('#detailId').val();

		var submitData = {

			data:formData,
			id:vehicleId

		}

		Lizard.ajax({
			type:'POST',
			url:'/borrowers/vehicles/conditions',
			data:submitData,
			success(data){

				if (data) {

					location.href = `/borrowers/vehicle/list/${vehicleId}?id=${detailId}`;

				}
			}
		})

	},

	getFormData(){

		var leather =$.trim($('#leather').data('value'));


		var sunroof =  $.trim($('#sunroof').data('value'));

		var navigation =  $.trim($('#navigation').data('value'));

		var kilowatt = $.trim($('#kilowatt').val());

		var interior =  $.trim($('#interior').data('value'));

		var paint =  $.trim($('#paint').data('value'));

		var licensePrice = $.trim($('#licensePrice').val());

		var mileage = $.trim($('#mileage').val());

		var buyTime = $.trim($('#buyTime').val());

		var transferTime = $.trim($('#transferTime').val());

		var registrationTime = $.trim($('#registrationTime').val());

		var insuranceTime = $.trim($('#insuranceTime').val());

		var purchaseType = $.trim($('#purchaseType').data('value'));

		var purchasePrice = $.trim($('#purchasePrice').val());

		var loanAmount = $.trim($('#loanAmount').val());

		var loanPendingAmount = $.trim($('#loanPendingAmount').val());

		var loanTerms = $.trim($('#loanTerms').val());

		var loanPendingTerms = $.trim($('#loanPendingTerms').val());

		var collateralTimes = $.trim($('#collateralTimes').val());

		var mortgageTime = $.trim($('#mortgageTime').data('value'));

		var claimsRecords = $.trim($('#claimsRecords').data('value'));

		var claimsAmount = $.trim($('#claimsAmount').val());

		var certificate = [];

		$('#certificate strong').each(function(){

			if ($(this).hasClass('active')) {

				var value =  $(this).data('value');

				certificate.push(value);
			}

		})

		var electricalSystem = $.trim($('#electricalSystem').data('value'));


		var electricalSystemDes = $.trim($('#electricalSystemDes').data('value'));

		var chassis =  $.trim($('#chassis').data('value'));

		var chassisDes = $.trim($('#chassisDes').data('value'));


		var vehicleWork = $.trim($('#vehicleWork').data('value'));

		var evaluatePrice = $.trim($('#evaluatePrice').val());

		var summary = $.trim($('#summary').val());

		if (purchaseType == 0){

			loanAmount = null;

			loanPendingAmount = null;

			loanTerms = null;

			loanPendingTerms = null;

		}

		var data = {
			is_leather: leather,
			has_sunroof: sunroof,
			has_navigation: navigation,
			power_kw: kilowatt,
			interior_status:interior,
			surface_status: paint,
			plate_price: licensePrice,
			mileage: mileage,
			buy_day: buyTime,
			assigned_day:transferTime,
			registration_day:registrationTime,
			insurance_expired_day: insuranceTime,
			purchase_type: purchaseType,
			buy_price: purchasePrice,
			loan_amount: loanAmount,
			loan_pending_amount: loanPendingAmount,
			loan_terms: loanTerms,
			loan_pending_terms: loanPendingTerms,
			collateral_times: collateralTimes,
			collateral_last_free: mortgageTime,
			has_claims_records:claimsRecords,
			certificate:certificate,
			starter_status:[],
			engine_status:[],
			transmission_status:[],
			exhaust_status:[],
			is_electric_ok:electricalSystem,
			is_chassis_ok:chassis,

			is_work_ok: vehicleWork,

			evaluated_price: evaluatePrice,

			summary: summary


		}
		if (claimsAmount){

			data.claims_amount = claimsAmount;
		}

		if (electricalSystemDes) {

			data.electric_state = electricalSystemDes;

		}

		if (chassisDes) {

			data.chassis_state = chassisDes;
		}

		var checkedList = [{
			ele:'#starter',
			name:'starter_status'
		},{
			ele:'#engine',
			name:'engine_status'
		},{
			ele:'#transmission',
			name:'transmission_status'
		},{
			ele:'#exhaust',
			name:'exhaust_status'
		}];

		checkedList.forEach((item) =>{

			$(item.ele+ ' strong').each(function(){

				if ($(this).hasClass('active')) {

					var value = $(this).data('value');

					data[item.name].push(value);

				}
			})

		})

		return data;
	},

	validateForm(){

		var {
			is_leather,
			has_sunroof,
			has_navigation,
			power_kw,
			interior_status,
			surface_status,
			plate_price,
			mileage,
			buy_day,
			assigned_day,
			registration_day,
			insurance_expired_day,
			purchase_type,
			buy_price,
			loan_amount,
			loan_pending_amount,
			loan_terms,
			loan_pending_terms,
			collateral_times,
			collateral_last_free,
			has_claims_records,
			certificate,
			starter_status,
			engine_status,
			transmission_status,
			exhaust_status,
			is_electric_ok,
			is_chassis_ok,

			is_work_ok,

			evaluated_price,
			claims_amount,
			electric_state,
			chassis_state,
			summary,

		} = this.getFormData();


		const errInfo = [{
			element:'#leather',
			value:is_leather
		},{
			element:'#sunroof',
			value:has_sunroof
		},{
			element:'#navigation',
			value:has_navigation
		},{
			element:'#kilowatt',
			value:power_kw
		},{
			element:'#interior',
			value:interior_status
		},{
			element:'#paint',
			value:surface_status
		},{
			element:'#licensePrice',
			value:plate_price
		},{
			element:'#mileage',
			value:mileage
		},{
			element:'#buyTime',
			value:buy_day
		},{
			element:'#transferTime',
			value:assigned_day
		},{
			element:'#registrationTime',
			value:registration_day
		},{
			element:'#insuranceTime',
			value:insurance_expired_day
		},{
			element:'#purchaseType',
			value:purchase_type
		},{
			element:'#purchasePrice',
			value:buy_price
		},{
			element:'#collateralTimes',
			value:collateral_times
		},{
			element:'#claimsRecords',
			value:has_claims_records
		},{
			element:'#electricalSystem',
			value:is_electric_ok
		},{
			element:'#chassis',
			value:is_chassis_ok
		},{
			element:'#vehicleWork',
			value:is_work_ok
		},{
			element:'#evaluatePrice',
			value:evaluated_price
		},{
			element:'#summary',
			value:summary
		}]

		let isValidate = true;

		errInfo.forEach(function(item){

			if (!item.value) {

				$(item.element).parent().addClass('form-group-error');

				isValidate = false;

			}

		})

		if (!certificate.length ) {

			$('#certificate').parent().addClass('form-group-error');

			isValidate = false;

		}

		var loanErrInfo = [{
			element:'#loanAmount',
			value:loan_amount
		},{
			element:'#loanPendingAmount',
			value:loan_pending_amount
		},{
			element:'#loanTerms',
			value:loan_terms
		},{
			element:'#loanPendingTerms',
			value:loan_pending_terms
		}]

		if (purchase_type !== 0) {

			loanErrInfo.forEach(function(item){

				if (!item.value) {

					$(item.element).parent().addClass('form-group-error');

					isValidate = false;

				}

			})
		}
		var performanceErrorInfo = [{
			element:'#starter',
			value:starter_status
			},{
			element:'#engine',
			value:engine_status
			},{
			element:'#transmission',
			value:transmission_status
			},{
			element:'#exhaust',
			value:exhaust_status
		}];

		performanceErrorInfo.forEach(function(item){

			if (!item.value.length) {

				$(item.element).parent().addClass('form-group-error');

				isValidate = false;

			}

		})

		return isValidate;


	},

	selectType(){

		$('.js_checked').click(function(){

			var value = $(this).data('value');

			$(this).parent().removeClass('form-group-error').find('label').data('value',value);


			$(this).addClass('active').siblings().removeClass('active');

		})

		$('.js_disabled').click(function(){

			var value = $(this).data('value');

			if (value == 0) {

				$(this).parents('.form-group-rows').addClass('form-group-error');

				$(this).parent().next().removeClass('user-ui-disabled').prop('disabled',false);

			} else {

				$(this).parents('.form-group-rows').removeClass('form-group-error');

				$(this).parent().next().addClass('user-ui-disabled').prop('disabled',true).val('');

			}

			$(this).parent().prev().data('value',value);

			$(this).addClass('active').siblings().removeClass('active');

		})


		$('.js_insurance').click(function(){

			var value = $(this).data('value');



			if (value == 0) {

				$(this).parents('.form-group-rows').removeClass('form-group-error');

				$(this).parent().next().addClass('user-ui-disabled').prop('disabled',true).val('');

			} else {

				$(this).parents('.form-group-rows').addClass('form-group-error');

				$(this).parent().next().removeClass('user-ui-disabled').prop('disabled',false);

			}

			$(this).parent().prev().data('value',value);

			$(this).addClass('active').siblings().removeClass('active');

		})

		$('.js_checkbox').click(function(){

			$(this).toggleClass('active');

			$(this).parents('.form-group-rows').removeClass('form-group-error');

		})

		$('.user-ui-input').on('input',function(){

			if ($(this).val()){

				$(this).parent().removeClass('form-group-error');
			}

		})

		$('.js_multiple').click(function(){

			var value = $(this).data('value');

			if (value == 0) {

				$(this).parents('.form-group-rows').removeClass('form-group-error');

				$(this).parent().find('.js_multiple').removeClass('active').eq(0).addClass('active');

			} else {

				$(this).parents('.form-group-rows').removeClass('form-group-error');

				$(this).toggleClass('active').parent().find('.js_multiple').eq(0).removeClass('active')

			}

		})

		$('.js_loan').click(function(){

			var value = $(this).data('value');

			if (value == 0) {

				$('.js_amount').addClass('user-ui-disabled').prop('disabled',true).val('').parent().removeClass('form-group-error');

			} else {

				$('.js_amount').removeClass('user-ui-disabled').prop('disabled',false).parent();

			}

		})

		$('.vehicle_run_des').on('input',function(){

			$(this).parent().removeClass('form-group-error');

		})
	}
})
