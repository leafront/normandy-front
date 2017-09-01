/**
 * Created by leafrontye on 2017/7/26.
 */

var baseModel = require('./baseModel');

var request = require('request-promise');

var querystring = require('querystring');


module.exports = {

	async authority (ctx,{gateway,url,data}){

		return new Promise((resolve,reject) => {

			baseModel.get(ctx, {
				gateway,
				url,
				data
			}).then((authority) =>{

				const { shopuser: { shop={}, roles=[] }, is_admin } = authority;

				let roleList = is_admin ? ['SUPER_ADMIN'] : [];

				roles.forEach((item) => {

					item.permissions.forEach((child) =>{

						roleList.push(child.code);
					})
				})

				resolve ({ roleList, shop, authority })

			}).catch((err) =>{

				resolve ({ roleList:[], shop:{}, authority:{} })

				//reject(err);

			})

		})

  },
	mobileEncrypt(text = ''){

		var pattern = /(\d{3})\d{4}(\d{4})/;

		return text.replace(pattern, '$1****$2');

	},
	idCardEncrypt(text){

		var pattern = /(\d{6})\d{8}(\d{4})/;

		return text.replace(pattern, '$1********$2');

	},

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

	getInterface (ctx,{type,url,data}) {

		var requestData = {
			method: type,
			url: url
		};

		if (type == "POST") {

			requestData.body = querystring.stringify(data);

			requestData.headers = { 'content-type':'application/x-www-form-urlencoded' }

		} else {

			requestData.url = requestData == '' ? url : url + '?' + querystring.stringify(data);

		}

		return new Promise((resolve,reject) => {

			request(requestData).then((res) =>{

				if (typeof res == 'object') {

					resolve(res);

				} else {

					try {

						res = JSON.parse(res);

						resolve(res);


					} catch (error) {

						reject(error);

					}
				}

			}).catch((err) =>{

				reject(err);

			})
		})
	},
	getPage(page,showPage) {

		let iPage = 0;

		if ((page % showPage) == 0){

			iPage = Math.floor((page / showPage -1)) * showPage;

		} else {

			iPage = Math.floor(page / showPage) * showPage;

		}

		return iPage

	}
}