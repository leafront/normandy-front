/**
 * Created by leafrontye on 16/8/24.
 */
var request = require('request-promise');

var querystring = require('querystring');

const userAPI = 'http://user.qgqg.me';

const shopAPI = 'http://shop.qgqg.me';


module.exports = {

	async get(ctx,{gateway,url,data}){


		const requestData = querystring.stringify(data);

		const API = gateway == 'gatewayExt' ? userAPI : shopAPI;


		url = requestData == '' ? API + url + requestData : API + url + '?' + requestData;

		const getCookies = ctx.cookies;

		const jwt = getCookies.get('jwt');

		const org_id = getCookies.get('org_id');

		return new Promise((resolve,reject) => {
			request({
				method: 'GET',
				url: url,
				headers:{
					"X-Org":org_id,
					"Authorization":'Bearer ' + jwt
				}
			}).then((res) =>{

				console.log(url)

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
	async post (ctx,{url,gateway=undefined,data}){

		const API = gateway == 'gatewayExt' ? userAPI : shopAPI ;

		const getCookies = ctx.cookies;

		const jwt = getCookies.get('jwt');

		const org_id = getCookies.get('org_id');

		return new Promise((resolve,reject) => {
			request({
				method: 'POST',
				url: API + url,
				body: JSON.stringify(data),
				headers: {
					"X-Org": org_id,
					"Authorization": 'Bearer ' + jwt
				}
			}).then((res) => {

				try {

					res = JSON.parse(res);

					resolve(res);


				} catch (error) {

					reject(error);
				}

			}).catch((err) => {

				reject(err);
			})
		})
	}
}
