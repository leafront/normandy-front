var $ = require('../lib/jquery');

var ejs = require('../lib/ejs');

function Calendar(options){

	this.date = new Date();

	this.year = this.date.getFullYear();

	this.month = this.date.getMonth() + 1;

	this.day = this.date.getDate();

	this.startYear = options.startYear;

	this.yearNum = options.yearNum;

	this.monthNum = 12;

	this.callback = options.callback;

	this.ele = $(options.ele);

}
Calendar.prototype = {
	constructor: Calendar,

	getDaysInMonth (year, month) {

		function isLeapYear (year) {
			if (year % 100 === 0) {
				if (year % 400 === 0) {
					return true;
				}
			} else if (year % 4 === 0) {
				return true;
			}
			return false;
		};
		var leapYearDay = isLeapYear(year) ? 29 : 28;
		return [null,31, leapYearDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	},
	parseNumber (number) {
		if (number < 10) {
			return '0' + number
		} else {
			return number + '';
		}
	},
	showCalendar(){


		var eleTop = this.ele.offset().top + this.ele.height() + 10;

		var eleLeft = this.ele.offset().left;

		this.ele.click((e) =>{

			e.stopPropagation();

			$('#calendar').css({'left':eleLeft,top:eleTop}).addClass('active');

			this.renderView();

		})

		$(document).click(() =>{

			$('#calendar').removeClass('active').empty();
		})


	},

	renderView(){

		this.initTpl();

		var getDate = this.ele.val();

		var inputYear = this.year;

		var inputMonth = this.month;

		var inputDay = this.day;


		if (getDate) {

			getDate = getDate.split('-');

			inputYear = getDate[0];

			inputMonth = parseInt(getDate[1]);

			inputDay = getDate[2];

			$('#js_year').text(inputYear);

			$('#js_month').text(inputMonth);

			$('#getDate').val(this.ele.val());

		}

		this.renderTpl(inputYear,inputMonth,inputDay);


		var This = this;


		$('#calendar-year').on('click','li',function(e){

			e.stopPropagation();

			var year = $(this).data('value');

			$(this).parent().data('year',year);

			var month = $('#calendar-month').data('month');

			$(this).parent().prev('.js_selectTime').text($(this).text()).addClass('active').parents('.drop_menu').removeClass('active');

			month = month ? month : This.month;

			This.renderTpl(year,month,This.day);

			$('#getDate').val(year + '-' + month + '-' + This.day);


		})

		$('#calendar-month').on('click','li',function(e){

			e.stopPropagation();

			var month = $(this).data('value');

			$(this).parent().data('month',month);

			$(this).parent().prev('.js_selectTime').text($(this).text()).addClass('active').parents('.drop_menu').removeClass('active');

			var year = $('#calendar-year').data('year');

			year = year ? year : This.year;

			This.renderTpl(year,month,This.day);


		})


		$('.js_selectTime').click(function(e){

			e.stopPropagation();

			$(this).removeClass('active');

			$(this).parent('.drop_menu').toggleClass('active');

		})

		$('.ui-calendar-prev').click(function(e){

			e.stopPropagation();



			var { year:changeYear, month:changeMonth } = This.getDate();

			if (changeMonth == 1 ){

				changeMonth = 12;

				changeYear -= 1;

			} else {

				changeMonth -= 1;
			}

			This.renderTpl(changeYear,changeMonth,This.day);

			$('#js_year').text(changeYear);

			$('#js_month').text(changeMonth);


			$('#getDate').val(changeYear + '-' + This.parseNumber(changeMonth) + '-' + This.day);

		})


		$('.ui-calendar-next').click(function(e){

			e.stopPropagation();

			var { year:changeYear, month:changeMonth } = This.getDate();


			if (changeMonth == 12 ){

				changeMonth = 1;
				changeYear += 1;

			} else {

				changeMonth += 1;
			}


			$('#js_year').text(changeYear);

			$('#js_month').text(changeMonth);

			This.renderTpl(changeYear,changeMonth,This.day);

			$('#getDate').val(changeYear + '-' + This.parseNumber(changeMonth) + '-' + This.day);

		})


	},

	renderTpl(year,month,today){


		var firstDay = new Date(year,month-1,1).getDay();

		var currentYear = this.year;

		var currentMonth = this.parseNumber(this.month);

		var rows = Math.ceil((this.getDaysInMonth(year,month) + firstDay)/7);

		var tpl = `
	    <% for (var i = 0; i < rows;i++){%>
					<div class="ui-calendar-item">
							<%for(k = 0;k < 7;k++) {

								var index = i * 7 + k;

								var day = index - firstDay + 1;

								if (day <= 0 || day > getDaysInMonth(year,month)) {
									 day = ""
								}
								var calcClass = '';

								if (currentYear == year && currentMonth == parseNumber(month) && day == today ){

									calcClass = 'active';

								} else {
								  calcClass = '';
								}

								var date = year + '-' +  parseNumber(month) + '-' + day;

								%>
							<%if(day){%>
							 <span data-date="<%-date%>" class="ui-calender-today js_calc <%-calcClass%>"><%-day%></span>

							<%}else{%>
								 <span class="js_calc"></span>
							<%}%>
						<%}%>
					</div>

	  <%}%>`;

		var html = ejs.render(tpl,{
			year,
			month:month,
			currentYear,
			currentMonth,
			rows,
			firstDay,
			today,
			getDaysInMonth:this.getDaysInMonth,
			parseNumber: this.parseNumber
		});

		var This = this;

		$('.ui-calendar-cont').html(html);

		$('.ui-calendar-item').on('click','.ui-calender-today',function(e){

			e.stopPropagation();

			var date = $(this).data('date');




			This.callback ? This.callback(date) : This.ele.val(date);

			$('#calendar').empty().removeClass('active');

			This.ele.parent() && This.ele.parent().removeClass('form-group-error');
		})

	},

	getDate(){

		var date = $('#getDate').val().split('-');

		var year = parseInt(date[0]);

		var month = parseInt(date[1]);

		return {
			year,
			month
		}
	},
	initTpl(year,month){
		var tpl = `
         <div class="ui-calendar-date">
            <span class="ui-calendar-prev"></span>

            <div class="ui-calendar-drop">
                <div class="drop_menu drop_menu_time">
                    <span class="active js_selectTime" id="js_year"><%-year%></span>
                    <ul class="drop_menu_list" id="calendar-year">
                      <% for(var i = startYear; i <= year + yearNum; i++){%>
                        <li data-value="<%-i%>">
                            <a href="javascript:;"><%-i%></a>
                        </li>
                      <%}%>
                    </ul>
                </div>
                <strong>年</strong>
                <div class="drop_menu drop_menu_month">
                    <span class="active js_selectTime" id="js_month"><%-month%></span>
                    <ul class="drop_menu_list" id="calendar-month">
									    <%for(var i = 1; i <=monthNum; i++){%>
                        <li data-value="<%-i%>">
                            <a href="javascript:;"><%-i%></a>
                        </li>
                      <%}%>
                    </ul>
                </div>

                <strong>月</strong>
            </div>
            <span class="ui-calendar-next"></span>
        </div>
        <div class="ui-calendar-title">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
        </div>
        <input type="hidden" id="getDate" value="<%-year+'-'+parseNumber(month)+'-'+day%>"/>
        <div class="ui-calendar-cont">

        </div>`;

		var year = this.year;

		var month = this.month;

		var yearNum = this.yearNum;

		var day = this.day;

		var startYear =  this.startYear;

		var monthNum = this.monthNum;


		var html = ejs.render(tpl,{
			year,
			yearNum,
			month,
			parseNumber:this.parseNumber,
			day,
			startYear,
			monthNum
		});

		$('#calendar').html(html);

	}
}

module.exports = Calendar;