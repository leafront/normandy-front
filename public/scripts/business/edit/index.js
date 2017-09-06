var $ = require('../../lib/jquery.min');

var common = require('../../common');

var Vue = require('../../lib/vue');

var popup = require('../../widget/popup');

var dataModel = require('../../../../model/data');

const {

	repaymentType,
	termUnit

} = dataModel;


const business = Object.assign({},editBusiness);

const repay_schema = Object.assign([],editBusiness.repay_schema).length ? Object.assign([],editBusiness.repay_schema) : [{"term": 1,"interest":"","capital":""}];


var vueConfig = new Vue({

	el:'#app',

	data:  {
		dropMenu: -1,
		repaymentType,
		termUnit,
		business:business,

		salesmenList:[],

		isValidate: true

	},

	computed: {

		termUnitType () {

			var term_unit = this.business.term_unit;

			if (term_unit !== "") {

				var value = this.termUnit[term_unit].name;

				return value;

			} else {

				return '请选择';
			}

		},
		repayType () {

			var repay_type = this.business.repay_type;

			if (repay_type !== "") {

				var value = this.repaymentType[repay_type].name;

				return value;

			} else {

				return '请选择';
			}

		},
		salesmanName () {

			var salesman = this.business.salesman;

			var value = "请选择";

			if (salesman !== "") {

				this.salesmenList.forEach((item) =>{

					if (item.user.id == salesman) {


						value = item.user.name;

					}

				})

				return value;


			} else {

				return value;
			}
		}
	},

	created() {

		Lizard.ajax({
			type:'GET',
			url:'/api/salesmen'
		}).then((data) => {

			var results = data.results;

			if (results && results.length) {

				this.salesmenList = results;

			}

		})

		this.initValue();

	},
	filters: {
		placeholder: function(value) {
			return value || '请选择';
		}
	},
	methods:{

		selectMenu (value) {

			if (this.dropMenu == value) {

				this.dropMenu = -1;

			} else {

				this.dropMenu = value;

			}

		},

		initValue (){

			var business = this.business;

			if (common.isEmptyObject(business.fees)) {

				this.business.fees = {
					"evaluation_fee": {
						"value":""
					},
					"agency_fee":{
						"value":""
					},
					"parking_fee":{
						"value":""
					},
					"violation_deposit_fee":{
						"value":""
					},
					"risk_deposit_fee":{
						"value":""
					},
					"gps_deposit_fee":{
						"value":""
					},
					"other_fee":{
						"name":"",
						"value":""
					},
					"gps_fee":{
						"value":""
					}
				}
			}
		},

		checkValue (property,value) {

			this.business[property] = value;


		},

		customStage () {

			popup.showContent('#popup');

		},

		rotateImg(event,property,index) {

			var img = $(event.currentTarget).prev();

			var rotateItem =  this.business[property][index];

			var origin_rotate = rotateItem.rotate || 0;

			var new_rotate = (origin_rotate + 90) % 360;

			img.css('transform', 'rotate('+ new_rotate +'deg)');

			rotateItem.rotate = new_rotate;

		},

		validateForm() {

			var isValidate = true;

			var business = this.business;

			 for (var attr in business) {

				 var value = business[attr];

				 if (value === "") {

					 isValidate = false;

				 }

			 }


			return isValidate;

		},

		uploadFile (event,uploadType) {


			var file = event.target.files;

			var fileFormat = ['.jpg','.png','.gif'];

			for (var i = 0, len = file.length; i < len; i++) {

				var filename = file[i].name;

				var fileSize = file[i].size;

				var fileType = file[i].type;


				var dIndex =filename.lastIndexOf(".");

				var fileSuffix = filename.substring(dIndex,filename.length);

				if (fileFormat.indexOf(fileSuffix) == -1) {

					Lizard.showToast(`${filename}文件格式不正确！`);

					return;
				}

				var fileInfo = {
					size:fileSize,
					name:filename
				}

				this.uploadKey(fileInfo,file[i],uploadType);
			}
		},

		uploadKey (fileInfo,file,uploadType) {


			Lizard.ajax({
				type:'GET',
				url:'/api/oss-key',
				data: fileInfo
			}).then((data) => {

				this.uploadImg(data,file,uploadType);

			})

		},

		deleteImg (type,index) {

			this.business[type].splice(index,1);

		},
		uploadImg (data,file,uploadType) {

			var formData = new FormData();

			var { prefix, access_key, policy, sign } = data;

			var formJSON = {
				"key": prefix,
				"OSSAccessKeyId": access_key,
				"policy": policy,
				"signature": sign,
				"Content-Type": file.type,
				"file": file
			}

			for (var attr in formJSON ) {

				formData.append(attr,formJSON[attr]);

			}

			$.ajax({
				type:'POST',
				url:'http://private-q.oss-cn-beijing.aliyuncs.com',
				data:formData,
				cache: false,
				contentType: false,
				processData: false,
				success: () =>{

					this.business[uploadType].push({
						source_link: data.uri,
						key: data.key,
						filename: file.name,
						size: file.size,
						rotate: 0
					})

				}
			})

		},
		submitAction (borrowingId) {

			var { isStage } =  popupConfig;



			if (!isStage) {

				popupConfig.repay_schema = [];
			}

			var isValidate = this.validateForm();

			var formData = this.business;

			var formJSON = ['apply_pics','cover_pic','call_records','contract_pics','supporting_pics','violation_records','fees','repay_schema'];

			var submitData = Object.assign({repay_schema: popupConfig.repay_schema},formData);

			formJSON.forEach((item) =>{

				submitData[item]  = JSON.stringify(submitData[item]);

			})

			this.isValidate = isValidate;

			if (!isValidate) {

				Lizard.showToast('请完善借款人信息填写');

				return;

			}

			Lizard.ajax({
				type:'PATCH',
				url:`/api/borrowings/${borrowingId}`,
				data:submitData
			}).then((data) => {

				if (data) {

					Lizard.showToast('修改成功, 跳转至借款列表...');

					setTimeout(() =>{

						location.href = '/business';

					},500)

				}

			})


		},
		cancelAction (id) {

			location.href = `/business/${id}`;

		}

	},

	mounted () {

		common.headerMenu();

		common.dropMenu.call(this);

	}
})



var popupConfig = new Vue({

	el:'#popup',
	data:{
		isStage:false,

		iStage:editBusiness.repay_schema.length || 1,
		repay_schema:repay_schema,
		dropMenu:[]
	},
	created() {

		var dropMenu = [];


		this.repay_schema.forEach(function(){

			dropMenu.push({isOpen:false,value:'请选择'})

		})

		this.dropMenu = dropMenu;

	},
	computed: {

		stage () {

			var business = vueConfig.business

			if (business.term_unit == 0 && business.term) {


				return 1;

			} else if (business.term_unit == 1 && business.term ){

				return business.term;

			}

		}

	},
	methods: {

		selectMenu (value) {

			if (this.dropMenu == value) {

				this.dropMenu = -1;

			} else {

				this.dropMenu = value;

			}
		},

		checkValue (property, value) {

			this.repay_schema[property] = value;

			this.dropMenu = -1;

		},

		hidePopup () {

			popup.hideContent('#popup');

			this.isStage = false;

			this.iStage = 1;

			this.repay_schema = repay_schema;

		},

		addStage () {

			var isValidate = true;

			this.repay_schema.forEach((item) =>{

				for (var attr in item) {

					if (item[attr] === "") {

						Lizard.showToast('请完善借款信息');

						isValidate = false;

						return;

					}
				}

			})

			if (isValidate) {

				this.isStage = true;

				popup.hideContent('#popup');

			}

		},
		addRecord (value) {

			this.iStage += 1;

			if (this.repay_schema.length < this.stage ) {

				this.repay_schema.push({"term": this.iStage,"interest":"","capital":""});

				this.dropMenu.push({"isOpen": false,value:"请选择"})

			}

		},
		removeRecord (index) {

			this.repay_schema.splice(index,1);

			this.dropMenu.splice(index,1);

		},
		showMenu (isOpen,index) {


			this.dropMenu[index].isOpen = isOpen;

		},
		selectValue (index,value){

			this.dropMenu[index].isOpen = false;

			var isValidate = true;

			this.repay_schema.forEach((item) =>{

				if (item.term == value){

					Lizard.showToast(`当前已选择第${value}期`);

					isValidate = false;

				}

			})


			if (isValidate) {

				this.repay_schema[index].term = value;

			}

		}
	}
})


