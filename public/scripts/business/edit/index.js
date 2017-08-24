var $ = require('../../lib/jquery');

var common = require('../../common');

var Vue = require('../../lib/vue');

var popup = require('../../widget/popup');

var dataModel = require('../../../../model/data');

const {

	repaymentType

} = dataModel


var popupConfig = new Vue({

	el:'#popup',
	data:{
		stage: 5,
		isStage:false,
		repay_schema:[
			{"term":1,"interest":"","capital":""},
			{"term":2,"interest":"","capital":""},
			{"term":3,"interest":"","capital":""},
			{"term":4,"interest":"","capital":""},
			{"term":5,"interest":"","capital":""}
		],
		dropMenu:[
			{isOpen:false,value:'请选择'},
			{isOpen:false,value:'请选择'},
			{isOpen:false,value:'请选择'},
			{isOpen:false,value:'请选择'},
			{isOpen:false,value:'请选择'}
		]
	},
	methods: {

		checkValue (property, value) {

			this.repay_schema[property] = value;

		},

		hidePopup () {

			popup.hideContent('#popup');

			this.isStage = false;

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

			var stage = this.stage;

			this.stage += value;

			this.repay_schema.push({"term": this.stage,"interest":"","capital":""});

			this.dropMenu.push({"isOpen": false,value:"请选择"})

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


var vueConfig = new Vue({

	el:'#app',

	data:  {
		repaymentType,
		business:editBusiness,

		salesmenList:[],

		salesmanName:'',

		stage: 5,

		loanType:'请选择',

		isValidate: true

	},

	created() {

		Lizard.ajax({
			type:'POST',
			url:'/business/salesmen',
			success:(data) =>{

				var results = data.results;

				if (results && results.length) {

					this.salesmenList = results;


					results.forEach((item) =>{

						if (item.user.id == this.business.salesman) {


							this.salesmanName = item.user.name;

						}

					})

				}
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

			if (business.repay_type !== "") {

				this.loanType = this.repaymentType[business.repay_type].name;

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

			var new_rotate = ( + 90) % 360;

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
				type:'POST',
				url:'/business/oss-key',
				data: fileInfo,
				success:(data) => {

					this.uploadImg(data,file,uploadType);
				}
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

			var { repay_schema, isStage } =  popupConfig;

			if (!isStage) {

				repay_schema = [];
			}

			var isValidate = this.validateForm();

			var formData = this.business;

			var formJSON = ['apply_pics','call_records','contract_pics','supporting_pics','violation_records','fees','repay_schema'];

			var submitData = Object.assign({repay_schema},formData);

			formJSON.forEach((item) =>{

				submitData[item]  = JSON.stringify(submitData[item]);

			})

			this.isValidate = isValidate;

			if (!isValidate) {

				Lizard.showToast('请完善借款人信息填写');

				return;

			}

			console.log(JSON.stringify(submitData,null,2))

			Lizard.ajax({
				type:'POST',
				url:'/business/edit',
				data:{
					id:borrowingId,
					data:submitData
				},
				success: (data) =>{

					if (data) {

						Lizard.showToast('修改成功, 跳转至借款列表...');

						setTimeout(() =>{

							location.href = '/business';

						},500)

					}

				}
			})


		},
		cancelAction (id) {

			location.href = `/business/${id}`;

		}

	},

	mounted () {

		common.headerMenu();

		common.dropMenu();
	}
})



