

var Promise = require('es6-promise').Promise;

var util = require('../lib/util/index');

var Lizard = {

	prompt: function (obj,determine,cancel){

		var { tips, btn } = obj;

		var tpl = `
			<div class="layui-poup"></div>
			<div class="layui-layer">
				<div class="layui-layer-title">提示</div>
				<div class="layui-layer-content">${tips}</div>
				<div class="layui-layer-btn layui-layer-btn-">
					<a href="javascript:;" class="layui-layer-btn0">${ btn[0]}</a>
					<a href="javascript:;" class="layui-layer-btn1">${btn [1]}</a>
				</div>
		</div>`;

		Lizard.append(document.body,tpl);


		var layUiPopup = document.querySelector('.layui-poup');

		var layUiLayer	= document.querySelector('.layui-layer');

		document.querySelector('.layui-layer-btn0').addEventListener('click',function(){

			determine();

			layUiPopup.parentNode.removeChild(layUiPopup);

			layUiLayer.parentNode.removeChild(layUiLayer);

		})

		document.querySelector('.layui-layer-btn1').addEventListener('click',function(){

			cancel && cancel();

			layUiPopup.parentNode.removeChild(layUiPopup);

			layUiLayer.parentNode.removeChild(layUiLayer);

		})
	},
	showToast:function(value){

		var tpl=`
		<div class="mask">
		 </div>
		 <div class="mask-ui">
		 <span>${value}</span>
		</div>`;

		if (document.querySelector('.mask')) {
			return;
		}

		Lizard.append(document.body,tpl);

		var maskUi = document.querySelector('.mask-ui');

		var mask = document.querySelector('.mask');


		setTimeout(() =>{

			maskUi.parentNode.removeChild(maskUi);

			mask.parentNode.removeChild(mask);

		},2000)
	},

	showLoading () {

		var tpl = `
			<div class="loadingToast">
				<div class="weui-mask_transparent"></div>
				<div class="weui-toast">
					<i class="weui-loading weui-icon_toast"></i>
					<p class="weui-toast__content">正在加载中</p>
				</div>
		  </div>`;

		if (document.querySelector('.loadingToast')) {
			return;
		}

		Lizard.append(document.body,tpl);

	},

	hideLoading () {

		var loading = document.querySelector('.loadingToast');

		setTimeout(() =>{

			loading.parentNode.removeChild(loading);

		},500);

	},

	toggleClass (element,sClass) {

		if (element.classList.contains(sClass)) {

			element.classList.remove(sClass);

		} else {

			element.classList.add(sClass);
		}

	},

	append (el, html) {

		var divTemp = document.createElement("ul"),

			nodes = null,

			fragment = document.createDocumentFragment();

		divTemp.innerHTML = html;

		nodes = divTemp.childNodes;

		for (var i = 0, length = nodes.length; i < length; i += 1) {

			fragment.appendChild(nodes[i].cloneNode(true));
		}

		el.appendChild(fragment);

		// 清除
		nodes = null;
		fragment = null;
	},
	checkNumber: function (theObj) {
		var reg = /^[0-9]+.?[0-9]*$/;
		if (reg.test(theObj)) {
			return true;
		}
		return false;
	},

	query: function(){

		var strParame = arguments[0];

		var args = {};

		var query = location.search.substring(1).toLowerCase(); // Get query string

		var pairs = query.split("&"); // Break at ampersand

		for (var i = 0; i < pairs.length; i++) {

			var pos = pairs[i].indexOf('='); // Look for "name=value"

			if (pos == -1) continue; // If not found, skip

			var argname = pairs[i].substring(0, pos); // Extract the name

			var value = pairs[i].substring(pos + 1); // Extract the value

			value=decodeURIComponent(value); // Decode it, if needed

			args[argname] = value; // Store as a property
		}
		if (strParame == undefined) {

			return args;

		}else {

			return args[strParame.toLowerCase()]; // Return the object
		}
	},

	diffArray: function(arr1,arr2){

		var arr  = arr1.filter(function(item) {

			return arr2.indexOf(item) < 0;

		})

		return arr;

	},

	ajax (ajaxOptions) {

		var jwt = Lizard.getCookie('jwt');

		var org_id = Lizard.getCookie('org_id');

		var options = {
			isHeader:true,
			async: true,
			headers,
			timeout: 3000,
			dataType:'json'
		}


		options = Object.assign(options,ajaxOptions);

		var headers = {};

		if (options.isHeader) {

			headers["Content-type"] = "application/x-www-form-urlencoded";

			headers.Accept = 'application/json';

			headers.Authorization = 'Bearer ' + jwt;
		}

		if (org_id) {

			headers['X-Org'] = org_id;

		}

		headers = Object.assign(headers,ajaxOptions.headers);

		options.headers = headers;


		var ajax = new Promise((resolve, reject) => {

			util.ajax(options).then((results) => {

				resolve(results);

			}).catch((err) => {

				console.log(err)

				if (err) {

					Lizard.showToast(err.error.message);

					options.error && options.error();
				}

			})

		})

		return ajax;

	},
	getDateDiff: function (dateTimeStamp){

		dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/gi,"/"));
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if (diffValue < 0) { return; }
		var monthC = diffValue/month;
		var weekC = diffValue/(7*day);
		var dayC = diffValue/day;
		var hourC = diffValue/hour;
		var minC = diffValue/minute;

		var result = "";
		if(monthC >= 1){
			result += parseInt(monthC) + "月前";
		}
		else if(weekC >= 1){
			result += parseInt(weekC) + "周前";
		}
		else if(dayC >= 1){
			result += parseInt(dayC) +"天前";
		}
		else if(hourC >= 1){
			result += parseInt(hourC) +"小时前";
		}
		else if(minC>=1){
			result += parseInt(minC) +"分钟前";
		}else
		result = "刚刚";
		return result;
	},
	getPathName:function(){

		var strUrl = document.location.toString();

		var arrObj = strUrl.split('//');

		var start = arrObj[1].indexOf('/');

		return arrObj[1].substring(start);
	},

	timeComputed (times) {

		if (times > 0 &&  times < 60 * 60 * 24) {

			return parseInt(times/60/60) + '小时';

		} else if (times >= 60 * 60 * 24 && times < 60 * 60 * 24 * 60) {

			return parseInt(times/60/60/24) + '天';

		} else if (times > 60 * 60 * 24 * 60) {

			return '大于60天';

		}

	},

	/**
	 * 对Date的扩展，将 Date 转化为指定格式的String
	 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
	 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	 * eg:
	 * (new Date().getTime(,"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	 * (new Date().getTime(,"yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
	 * (new Date().getTime(,"yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
	 * (new Date().getTime(,"yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
	 * (new Date().getTime(,"yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	 */
	dateFormat:function(tiems,fmt){

		var date = new Date(tiems);

		var o = {
			"M+" : date.getMonth()+1, //月份
			"d+" : date.getDate(), //日
			"h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
			"H+" : date.getHours(), //小时
			"m+" : date.getMinutes(), //分
			"s+" : date.getSeconds(), //秒
			"q+" : Math.floor((date.getMonth()+3)/3), //季度
			"S" :  date.getMilliseconds() //毫秒
		};
		var week = {
			"0" : "\u65e5",
			"1" : "\u4e00",
			"2" : "\u4e8c",
			"3" : "\u4e09",
			"4" : "\u56db",
			"5" : "\u4e94",
			"6" : "\u516d"
		};
		if(/(y+)/.test(fmt)){
			fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
		}
		if(/(E+)/.test(fmt)){
			fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[date.getDay()+""]);
		}
		for(var k in o){
			if(new RegExp("("+ k +")").test(fmt)){
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			}
		}
		return fmt;
	},
	//设置cookies
	setCookie:function (name,value,times) {
		var exp = new Date();
		exp.setTime(exp.getTime() +times);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
	},
	//读取cookies
	getCookie: function (name){
		var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg)){
			return unescape(arr[2]);

		} else {
			return null;
		}
	},

	//删除cookies
	removeCookie:function (name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if(cval!== null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
	},

	clearCookie:function (){
		var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys) {
			for (var i = keys.length; i--;)
				document.cookie=keys[i]+'=0;expires=' + new Date().toGMTString()+";path=/";
		}
	},
	throttle: function (func, wait, mustRun) {
		var timeout,
			startTime = new Date();

		return function() {
			var context = this,
				args = arguments,
				curTime = new Date();

			clearTimeout(timeout);
			// 如果达到了规定的触发时间间隔，触发 handler
			if(curTime - startTime >= mustRun){

				func.apply(context,args);

				startTime = curTime;

				// 没达到触发间隔，重新设定定时器
			}else{

				timeout = setTimeout(func, wait);

			}
		}
	}
}

window.Lizard = Lizard;

module.exports = Lizard;
