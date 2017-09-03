
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

		var options = {

			async: true,

			timeout: 5000,
			dataType: 'json'

		}

		options = Object.assign(options,optionsAjax);

		options.async = options.async === false ? false : true;

		var xhr = new XMLHttpRequest();

		var ajax = new Promise((resolve, reject) => {

			var data = util.queryStringify(options.data);

			if (options.type == "GET") {

				options.url =  options.data == '' ? options.url : options.url + '?' + data;

			}

			xhr.open(options.type, options.url, options.async);

			xhr.timeout = options.timeout;

			//设置请求头
			for (var k in options.headers) {

				xhr.setRequestHeader(k, options.headers[k]);
			}

			xhr.setRequestHeader("Accept", "application/json");

			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			xhr.onprogress = options.onprogress;

			xhr.upload.onprogress = options.onuploadprogress;

			xhr.responseType = options.dataType;

			xhr.onreadystatechange = () => {

				if(xhr.readyState == 4){

					if((xhr.status >= 200 && xhr.status <=300)|| xhr.status == 304){

						resolve(xhr.response);

					} else {

						reject(xhr.response);

					}
				}

			}

			options.type == "GET" ? xhr.send() : 	xhr.send(data);

		})

		return ajax;

	}

}

module .exports = util;