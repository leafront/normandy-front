function Calendar(options){
	this.date = new Date();
	this.year = this.date.getFullYear();
	this.month = this.date.getMonth();
	this.day = this.date.getDate();
	this.startYear = options.startYear;

	this.monthNum = 12;
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
		return [31, leapYearDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	},
	parseNumber (number) {
		if (number < 10) {
			return '0' + number
		} else {
			return number + '';
		}
	},
	showCalendar(){

		this.initTpl();

		this.renderTpl(this.year,this.month);

		var This = this;


		$('#calendar-year').on('click','li',function(){

			var year = $(this).data('value');

			$(this).parent().data('year',year);

			var month = $('#calendar-month').data('month');

			month = month ? month : This.month;

			This.renderTpl(year,month);

		})

		$('#calendar-month').on('click','li',function(){

			var month = $(this).data('value');

			$(this).parent().data('month',month);

			var year = $('#calendar-year').data('month');

			year = year ? year : This.year;

			This.renderTpl(year,month);

		})


	},

	renderTpl(year,month){


		var firstDay = new Date(year,month,1).getDay();


		var currentYear = this.year;

		var currentMonth = this.parseNumber(this.month + 1);

		var today = this.day;

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

								if (currentYear == year && currentMonth == parseNumber(month+1) && day == today ){

									calcClass = 'active';

								} else {
								  calcClass = '';
								}

								var date = year + '-' + month + '-' + day;

								%>
							<%if(day){%>
							 <span data-date="<%-date%>" class="js_calc <%-calcClass%>"><%-day%></span>

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

		$('.ui-calendar-cont').html(html);

		$('.ui-calendar-item').on('click','.js_calc',function(){

			$('.js_calc').removeClass('active');

			var date = $(this).data('date');

			$('#getDate').val(date);

			$(this).addClass('active');

		})

		this.onSubmit();
	},
	onSubmit(){

		$('#js_confirm').click(function(){



		})

		$('#js_cancel').click(function(){



		})

	},
	initTpl(year,month){
		var tpl = `
         <div class="ui-calendar-date">
            <span class="ui-calendar-prev"></span>

            <div class="ui-calendar-drop">
                <div class="drop_menu drop_menu_time">
                    <span class="active js_select"><%-year%></span>
                    <ul class="drop_menu_list" id="calendar-year">
                      <% for(var i = startYear; i <=year; i++){%>
                        <li data-value="<%-i%>">
                            <a href="javascript:;"><%-i%></a>
                        </li>
                      <%}%>
                    </ul>
                </div>
                <strong>年</strong>
                <div class="drop_menu drop_menu_month">
                    <span class="active js_select"><%-(month + 1)%></span>
                    <ul class="drop_menu_list" id="calendar-month">
									    <%for(var i = 0; i <monthNum; i++){%>
                        <li data-value="<%-i%>">
                            <a href="javascript:;"><%-i+1%></a>
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
        <div class="ui-calendar-cont">

        </div>
        <div class="ui-calendar-submit">
        		<input type="hidden" id="getDate" value="<%-year+'-'+parseNumber(month+1)+'-'+day%>"/>
            <button class="btn_confirm" id="js_confirm">确定</button>
            <button class="btn_cancel" id="js_cancel">取消</button>
        </div>`;

		var year = this.year;

		var month = this.month;

		var day = this.day;

		var startYear =  this.startYear;

		var monthNum = this.monthNum;


		var html = ejs.render(tpl,{
			year,
			month,
			parseNumber:this.parseNumber,
			day,
			startYear,
			monthNum
		});

		$('#calendar').html(html);

	}
}
