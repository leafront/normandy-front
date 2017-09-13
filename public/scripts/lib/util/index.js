
var util = {

	queryStringify: function (obj) {

		function toQueryPair(key, value) {
			if (typeof value == 'undefined') {
				return key;
			}
			return key + '=' + encodeURIComponent(value === null ? '': String(value));
		}
		var ret = [];
		for (var key in obj) {
			key = encodeURIComponent(key);
			var values = obj[key];
			if (values && values.constructor == Array) { //数组
				var queryValues = [];

				for (var i = 0,
							 len = values.length,
							 value; i < len; i++) {
					value = values[i];
					queryValues.push(toQueryPair(key, value));
				}
				ret = ret.concat(queryValues);

			} else { //字符串
				ret.push(toQueryPair(key, values));
			}
		}
		return ret.join('&');

	},

	ajax (optionsAjax){


		var options = Object.assign({},optionsAjax);

		var ajax = new Promise((resolve, reject) => {

			var xhr = new XMLHttpRequest();

			var data = options.data;


			if (options.headers['Content-type'] == "application/x-www-form-urlencoded") {

				data = util.queryStringify(data);

			}


			if (options.type == "GET") {

				options.url =  options.data ?  options.url + '?' + data: options.url;

			}

			xhr.open(options.type, options.url, options.async);

			xhr.timeout = options.timeout;

			xhr.ontimeout = (event) => {

				Lizard.showToast('请求超时！');

			}

			//设置请求头
			for (var k in options.headers) {

				xhr.setRequestHeader(k, options.headers[k]);
			}


			xhr.onprogress = options.onprogress; //下载进度

			xhr.upload.onprogress = options.onuploadProgress; //上传进度

			xhr.onreadystatechange = () => {

				if(xhr.readyState == 4){

					if((xhr.status >= 200 && xhr.status <=300)|| xhr.status == 304){

						resolve(JSON.parse(xhr.responseText));

					} else {

						reject(JSON.parse(xhr.responseText));

					}
				}

			}

			options.type == "GET" ? xhr.send(null) : 	xhr.send(data);

		})

		return ajax;

	}

}

module .exports = util;