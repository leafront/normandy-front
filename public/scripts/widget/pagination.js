
var $ = require('../lib/jquery');

var common = require('../common');

var paginationTpl = require('../templates/pagination');

var listEmpty = require('../templates/list_empty');

var pagination = {

	showPage (url,listTpl,tplData){

		var This = this;

		$('.pagination_list').on('click','.js_page',function(e) {

			e.preventDefault();

			var href = $(this).attr('href');


			var page = href.split('?')[1];


			if (history.pushState) {

				history.pushState(null,null,href);

			}

			var currentPage = parseInt(page.split('=')[1]);


			var data = {

				page:currentPage

			}


			This.pageList(url,data,listTpl,tplData);

		})

	},
	pageList(url,formData,listTpl,tplData) {

		var showPage = 5;

		Lizard.ajax({
			type: 'POST',
			url: url,
			data: formData,
			success: function (data) {


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

					$('.pagination_list').html(html);

					list = Object.assign({list},tplData);

					var listHtml = ejs.render(listTpl,list);

					$('.cont_list').html(listHtml);

				} else {

					var html = ejs.render(paginationTpl,{data:null});

					console.log(data)

					$('.pagination_list').html(html);

					$('.cont_list').html(listEmpty);

				}
			}
		})
	}
}

module.exports = pagination;
