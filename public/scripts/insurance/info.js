var Lizard = require('../widget/lizard');

var common = require('../common');

var Vue = require('../lib/vue');

var Calendar = require('../widget/calendar');

var local = require('../widget/local');

var validate = require('../widget/validate');

var insurance = local.get('INSURANCE');

var vueConfig = new Vue ({
	el: '#app',
	data: {
		isInsureSame: true,
		isRecognizeeSame: true,
		formData: insurance,
		brandName: ""

	},

	created () {

		this.getLicenseInfo(insurance.carInfo.licenseNo);

	},
	methods:{

		/**
		 * 获取车牌号查询车辆信息
		 * @ param {String} licenseNo
		 */

		getLicenseInfo (licenseNo) {

			Lizard.ajax({
				type: 'POST',
				url: '/api/auto/vehicleAndModel',
				data: {
					licenseNo
				}
			}).then((data) => {

				let results = data.data;

				if (data.state == 1 && results) {

					const {
						engineNo,
						firstRegisterDate,
						frameNo,
						licenseNo,
						brandName
					} = results;

					this.formData.carInfo.engineNo = engineNo;

					this.formData.carInfo.firstRegisterDate = firstRegisterDate;

				  this.formData.carInfo.frameNo = frameNo;

				  this.formData.carInfo.brandCode = licenseNo;

				  this.brandName = brandName;

				}

			})

		},

		checkValue (property,attr,value) {

			this.formData[property][attr] = value;

		},


		showCalendar (){

			var times = [{ele: '#firstRegisterDate', name: 'firstRegisterDate'}, {ele: '#transDate', name: 'transDate'}];


			times.forEach((item, index) => {

				var calendarItem = new Calendar({
					startYear: 2000,
					yearNum: 5,
					ele: item.ele,
					callback: (date) => {

						this.formData.carInfo[item.name] = date;

					}
				})

				calendarItem.showCalendar();
			})

		},

		/**
		 * 同投保人选项相同
		 */

		insureSame () {

			this.isInsureSame = !this.isInsureSame;

		},

		/**
		 * 被保人选项相同
		 */

		recognizeeSame () {

			this.isRecognizeeSame = !this.isRecognizeeSame;

		},

		sameItemInsurance () {

			this.formData.personInfo.applicantName = this.formData.personInfo.ownerName;

			this.formData.personInfo.applicantID = this.formData.personInfo.ownerID;

			this.formData.personInfo.applicantMobile = this.formData.personInfo.ownerMobile;


		},
		sameItemRecognizee () {

			this.formData.personInfo.insuredName = this.formData.personInfo.ownerName;

			this.formData.personInfo.insuredID = this.formData.personInfo.ownerID;

			this.formData.personInfo.insuredMobile = this.formData.personInfo.ownerMobile;

		},

		validateForm () {

			const {
				carInfo: {
					licenseNo,
					frameNo,
					brandCode,
					engineNo,
					isTrans,
					transDate,
					firstRegisterDate,
					sourceCertificateNo
				},
				personInfo: {
					ownerID,
					ownerMobile,
					applicantName,
					applicantID,
					applicantMobile,

					insuredName,
					insuredID,
					insuredMobile
				}

			} = this.formData;

			if (!frameNo) {

				Lizard.showToast('请输入车架号');

				return;

			}

			if (!(frameNo.length == 17)) {

				Lizard.showToast('请输入正确的17位车架号');

				return;

			}

			if (!engineNo) {

				Lizard.showToast('请输入发动机号');

				return;

			}

			if (!validate.isEngineNumber(engineNo)) {

				Lizard.showToast('请输入正确的发动机号');

				return;

			}

			if (!transDate) {

				Lizard.showToast('请选择过户日期');

				return;

			}

			if (!ownerID) {

				Lizard.showToast('请输入车主身份证号码');

				return;

			}

			if (!validate.isIdCard(ownerID)) {

				Lizard.showToast('请输入正确的车主身份证号码');

				return;

			}

			if (!ownerMobile) {

				Lizard.showToast('请输入车主手机号');

				return;

			}

			if (!validate.isMobile(ownerMobile)) {

				Lizard.showToast('请输入正确的车主手机号');

				return;

			}

			if (!applicantName) {

				Lizard.showToast('请输入投保人姓名');

				return;

			}

			if (!applicantMobile) {

				Lizard.showToast('请输入投保人手机号');

				return;

			}

			if (!validate.isMobile(applicantMobile)) {

				Lizard.showToast('请输入正确的投保人手机号');

				return;

			}

			if (!applicantID) {

				Lizard.showToast('请输入投保人身份证号');

				return;

			}

			if (!validate.isIdCard(applicantID)) {

				Lizard.showToast('请输入正确的投保人身份证号');

				return;

			}


			if (!insuredName) {

				Lizard.showToast('请输入被保人姓名');

				return;

			}

			if (!insuredMobile) {

				Lizard.showToast('请输入被保人手机号');

				return;

			}

			if (!validate.isMobile(insuredMobile)) {

				Lizard.showToast('请输入正确的被保人手机号');

				return;

			}

			if (!insuredID) {

				Lizard.showToast('请输入被保人身份证号');

				return;

			}

			if (!validate.isIdCard(insuredID)) {

				Lizard.showToast('请输入正确的被保人身份证号');

				return;

			}



		},

		submitInsurance () {

			if (this.isInsureSame) {

				this.sameItemInsurance();

			}

			if (this.isRecognizeeSame) {

				this.sameItemRecognizee();

			}

			this.validateForm();

			console.log(JSON.stringify(this.formData,null,2));


		}

	},
	computed:{



	},
	mounted () {

		common.headerMenu();

		this.showCalendar();

	}
})
