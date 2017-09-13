
var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var listTpl =  require('./templates/list');

var paginationTpl = require('../templates/pagination');

var pagination = require('../widget/pagination');

var Calendar = require('../widget/calendar');

var Vue = require('../lib/vue');


var vueConfig = new Vue({

	el:'#app',
	data:{
		params:{ mobile:"", name:"", from:"", to:""}
	},

	mounted(){

		common.headerMenu();

		this.showCalendar();

		pagination.showPage('/api/borrowers', this.params, listTpl, null);

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

		fetch (data) {

			Lizard.showLoading();

			var page = Lizard.query('page') || 1;

			var formData = Object.assign({ page }, data );

			pagination.pageList('/api/borrowers',formData,listTpl,null)
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
