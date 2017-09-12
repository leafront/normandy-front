
var common = require('../common');

var Lizard = require('../widget/lizard');

var listTpl =  require('./templates/list');

var paginationTpl = require('../templates/pagination');

var pagination = require('../widget/pagination');

var Calendar = require('../widget/calendar');

var Vue = require('../lib/vue');

var data = require('../../../model/data');


const {
	termUnit,
	borrowingStatus,
	autoReviewStatus,
	phoneReviewStatus,
	borrowingType

} = data;


var vueConfig = new Vue({

	el:'#app',
	data:{
		borrowingType,
		termUnit,
		borrowingStatus,
		dropMenu:-1,
		params:{ no:'', name:'', status:'', type:'', amount:'', term:'', term_unit:'', from:'', to:'' }
	},

	mounted(){

		common.headerMenu();

		this.showCalendar();


		pagination.showPage('/api/borrowings',this.params,listTpl,{
			termUnit,
			borrowingStatus,
			autoReviewStatus,
			phoneReviewStatus,
			borrowingType
		})

		document.documentElement.onclick = ()=>{

			this.dropMenu = -1;

		}

	},

	computed:{

		loanTerm () {

			var term_unit = this.params.term_unit;

			if (term_unit !== "") {

				var value = this.termUnit[term_unit].name;

				return value;

			} else {

				return '请选择';
			}

		},
		loanType () {

			var type = this.params.type;

			if (type !== "") {

				var value = this.borrowingType[type].name;

				return value;

			} else {

				return '请选择';
			}

		},
		loanStatus () {

			var status = this.params.status;

			if (status !== "") {

				var value = this.borrowingStatus[status].title;

				return value;

			} else {

				return '请选择';
			}

		}

	},
	methods: {

		showCalendar(){

			var times = [{ele: '#fromTime', name: 'from'}, {ele: '#endTime', name: 'to'}];


				times.forEach((item, index) => {

					var calendarItem = new Calendar({
						startYear: 2000,
						yearNum: 5,
						ele: item.ele,
						callback: (date) => {

							this.params[item.name] = date;

						}
					})

					calendarItem.showCalendar();
				})


		},

		checkValue (property, value) {

			this.params[property] = value;

		},

		fetch (data) {

			var page = Lizard.query('page') || 1;

			var formData = Object.assign({ page }, data );

			pagination.pageList('/api/borrowings',formData,listTpl,{
				termUnit,
				borrowingStatus,
				autoReviewStatus,
				phoneReviewStatus,
				borrowingType
			})
		},

		selectValue (value) {

			var dropMenu  = this.dropMenu;

			if (dropMenu == value) {

				this.dropMenu = -1;

			} else {

				this.dropMenu = value;
			}

		},

		query () {

			var data = Object.assign({},this.params);

			var startTime = data.from;

			var endTime = data.to;

			startTime =  startTime.replace('/\-/','/');

			endTime =  endTime.replace('/\-/','/');

			if ((startTime && endTime) && new Date(startTime).getTime() > new Date(endTime).getTime()) {

				Lizard.showToast('开始时间不能大于结束时间');

				return;

			}

			data = common.deleteEmptyProperty(data);

			this.fetch(data);

		},

		reset () {

			this.params = {
				no:'',
				name:'',
				status:'',
				type:'',
				amount:'',
				term:'',
				term_unit:'',
				from:'',
				to:''
			}

			this.fetch(null);

		}
	}
})

