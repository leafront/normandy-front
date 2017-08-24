
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

		$('.pagination_list').on('click','.js_page',(event) => {

			var data = this.params;

			pagination.showPage(event,'/borrowers/list', data, listTpl, null);

		})

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

			var page = Lizard.query('page') || {};

			var formData = Object.assign({ page }, data );

			pagination.pageList('/borrowers/list',formData,listTpl,null)
		},

		query () {

			var data = this.params;

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
