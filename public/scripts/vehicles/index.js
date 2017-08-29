
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var listTpl =  require('./templates/list');

var paginationTpl = require('../templates/pagination');

var pagination = require('../widget/pagination');

var Calendar = require('../widget/calendar');

var data = require('../../../model/data');

var Vue = require('../lib/vue');

const {

	colorList,
	borrowingStatus

} = data;


var vueConfig = new Vue({

	el:'#app',
	data:{
		params:{ vin:"",status:"", name:"", from:"", to:"" },
		dropMenu: -1,
		borrowingStatus
	},

	mounted(){

		common.headerMenu();

		this.showCalendar();

		$('.pagination_list').on('click','.js_page',(event) => {

			var data = this.params;

			pagination.showPage(event,'/vehicles/list', data, listTpl, {colorList});

		})

		$(document).click(() =>{

			this.dropMenu = -1;

		})

	},
	computed: {

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

		selectValue (value) {

			var dropMenu  = this.dropMenu;

			if (dropMenu == value) {

				this.dropMenu = -1;

			} else {

				this.dropMenu = value;
			}

		},

		checkValue (property, value) {

			this.params[property] = value;

		},


		fetch (data) {

			var page = Lizard.query('page') || {};

			var formData = Object.assign({ page }, data );

			pagination.pageList('/vehicles/list',formData,listTpl,{colorList})
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
				mobile:"",
				name:"",
				from:"",
				to:""
			}

			this.fetch(null);

		}
	}
})
