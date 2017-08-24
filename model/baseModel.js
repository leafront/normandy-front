
var request = require('request-promise');

var querystring = require('querystring');

const userAPI = 'http://user.qgqg.me';

const shopAPI = 'http://shop.qgqg.me';


module.exports = {

	async get(ctx,{gateway,url,data,header=undefined}){


		const requestData = querystring.stringify(data);

		const API = gateway == 'gatewayExt' ? userAPI : shopAPI;


		url = requestData == '' ? API + url + requestData : API + url + '?' + requestData;


		const getCookies = ctx.cookies;

		const jwt = header ? header.authorization : 'Bearer ' + getCookies.get('jwt');

		const org_id = getCookies.get('org_id');


		return new Promise((resolve,reject) => {
			request({
				method: 'GET',
				url: url,
				headers:{
					"X-Org":org_id,
					"Authorization":jwt
				}
			}).then((res) =>{

				try{

					res = JSON.parse(res);

					resolve(res);

				}catch(error){

					reject(error);
				}

			}).catch((err) =>{

				reject(err);

			})
		})
	},
	async post (ctx,{type,url,gateway=undefined,data}){

		const API = gateway == 'gatewayExt' ? userAPI : shopAPI ;

		const getCookies = ctx.cookies;

		const jwt = getCookies.get('jwt');

		const org_id = getCookies.get('org_id');

		return new Promise((resolve,reject) => {
			request({
				method: type,
				url: API + url,
				body: querystring.stringify(data),
				headers: {
					'content-type':'application/x-www-form-urlencoded',
					"X-Org": org_id,
					"Authorization": 'Bearer ' + jwt
				}
			}).then((res) => {

				if (typeof res == 'object') {

					try {

						res = JSON.parse(res);

						resolve(res);


					} catch (error) {

						reject(error);

					}

				} else {

					resolve(res);
				}


			}).catch((err) => {

				reject(err);

			})
		})
	}
}
