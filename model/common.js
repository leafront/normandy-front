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