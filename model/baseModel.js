/**
 * Created by leafrontye on 16/8/24.
 */
var request = require('request-promise');

var querystring = require('querystring');

var api = 'http://user.qgqg.me';


module.exports = {
	async get(ctx,{url,data}){


		const requestData = querystring.stringify(data);


		url = requestData == '' ? api + url + requestData : api + url + '?' + requestData;

		return new Promise((resolve,reject) => {
			request({
				method: 'GET',
				url: url
			}).then((res) =>{
				try{

					var res = JSON.parse(res);

					if(res.code == 0){

						resolve(res);

						console.log('success',url);

					} else if (res.code == 401){

						//ctx.redirect('/users/login?returnurl='+ctx.path);

						resolve(res);

					} else {

						console.log('code + '+res.code +'错误'+url);

						resolve(res);


					}
				}catch(error){

					console.log('数据fail',error,url);

					//ctx.redirect('/error/500?path='+ctx.path);

					resolve(error);
				}

			}).catch((err) =>{

				console.log(err,url);

			  //ctx.redirect('/error/500?path='+ctx.path);

				resolve(err);

			})
		})
	},
	async post (ctx,{url,data}){
		return new Promise((resolve,reject) => {
			request({
				method: 'POST',
				url: api + url,
				body: JSON.stringify(data)
			}).then((res) => {

				const data = JSON.parse(res);

				resolve(data);
			})
		})
	}
}
