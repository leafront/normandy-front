function dateFormat (tiems,fmt){

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
}

function showContent (ele){ //显示弹层

	document.querySelector('.popup_mask').classList.add('active');

	document.querySelector(ele).classList.add('active');

	document.body.classList.add('overflow');

}

function hideContent (ele){ //隐藏弹层

	document.querySelector('.popup_mask').classList.remove('active');

	document.querySelector(ele).classList.remove('active');

	document.body.classList.remove('overflow');

}


function showDeviceInfo(){

	var tpl = '\
       <div class="form-group clearfix">\
            <div class="form-group-rows">\
                <label>设备类型</label>\
                <input type="text" readonly="readonly" class="user-ui-input" placeholder="<%-item.dev_type%>"/>\
            </div>\
            <div class="form-group-rows">\
                <label>设备号（IMEI）</label>\
                <input type="text" readonly="readonly" class="user-ui-input" placeholder="<%-item.imei%>"/>\
            </div>\
        </div>\
        <div class="form-group clearfix">\
            <div class="form-group-rows">\
                <label>开通时间</label>\
                <input type="text" readonly="readonly" class="user-ui-input" placeholder="<%-dateFormat(item.in_time * 1000,\'yyyy-MM-dd hh:mm:ss\')%>"/>\
            </div>\
            <div class="form-group-rows">\
                <label>用户到期</label>\
                <input type="text" readonly="readonly" class="user-ui-input" placeholder="<%-dateFormat(item.out_time * 1000,\'yyyy-MM-dd hh:mm:ss\')%>"/>\
            </div>\
        </div>\
        <div class="form-group clearfix">\
            <div class="form-group-rows">\
                <label>名称</label>\
                <input type="text" readonly="readonly" class="user-ui-input" placeholder="<%-item.name || \'无设备名称\'%>"/>\
            </div>\
            <div class="form-group-rows">\
                <label>车牌号</label>\
                <input type="text" readonly="readonly" class="user-ui-input" placeholder="<%-item.number || \'无车牌号\'%>"/>\
            </div>\
        </div>'

	$.ajax({
		type: 'POST',
		url: '/vehicles/api/devinfo',
		data: {
			target:'北京朝阳店'
		},
		success:function(data){

			var results = data.data;

			var deviceInfo = {};

			if (results && results.length) {

				results.forEach(function(item){

					if (item.imei == '692916090692005') {

						deviceInfo = item;
					}

				})

				var html = ejs.render(tpl,{item:results[0],dateFormat:dateFormat});

				$('.device_popup').html(html);

				showContent('#popup');

			}

		}
	})
}
