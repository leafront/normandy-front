
var common = require('../common');

var ejs = require('../lib/ejs');

var paginationTpl = require('../templates/pagination');

var listEmpty = require('../templates/list_empty');

var pagination = {

	showPage (url,data,listTpl,tplData) {

		document.querySelector('.pagination_list').addEventListener("click",function(event) {

			if(event.target && event.target.className == "js_page") {

				event.preventDefault();

				pagination.getList(event,url, data, listTpl, tplData);

			}
		})

	},

	getList(event,url,data,listTpl,tplData){



		var href = event.target.getAttribute('href');

		var page = href.split('?')[1];


		if (history.pushState) {

			history.pushState(null,null,href);

		}

		var currentPage = parseInt(page.split('=')[1]);

		var formData = Object.assign({page:currentPage},data);

		formData = common.deleteEmptyProperty(formData);

		this.pageList(url,formData,listTpl,tplData);

	},
	pageList(url,formData,listTpl,tplData) {

		var showPage = 5;



		Lizard.ajax({
			type: 'GET',
			url: url,
			data: formData,
		}).then((data) => {

			if (data && data.results.length){


				var totalPage = data.total_page;

				var pageSize = data.page_size;

				var totalCount = data.total_count;

				var iPage = common.getPage(data.page,showPage);

				var page = data.page;

				var list = data.results;

				var pagination = {
					showPage:showPage,
					totalPage:totalPage,
					page,
					iPage:iPage,
					pathName:location.pathname,
					isFirstPage: (page - 1 ) == 0,
					isLastPage: page * pageSize > totalCount,
					data
				}


				var html = ejs.render(paginationTpl,pagination);

				list = Object.assign({list},tplData);




				var listHtml = ejs.render(listTpl,list);

				//document.querySelector('.pagination_list').innerHTML = html;

				document.querySelector('.cont_list').innerHTML = listHtml;

			} else {

				var html = ejs.render(paginationTpl,{data:null});

				document.querySelector('.pagination_list').innerHTML = html;

				document.querySelector('.cont_list').innerHTML = listEmpty

			}

		}).catch((err) => {

			console.log(err);

		})
	}
}

module.exports = pagination;
