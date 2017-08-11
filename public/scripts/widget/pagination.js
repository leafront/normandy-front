
var $ = require('../lib/jquery');

var common = require('../common');

var pagination = {

	showPage (url){

		var This = this;

		$('.pagination_list').on('click','.js_page',function(e) {

			e.preventDefault();

			var href = $(this).attr('href');


			var page = href.split('?')[1];


			if (history.pushState) {

				history.pushState(null,null,href);

			}

			var currentPage = parseInt(page.split('=')[1]);

			This.pageList(url,currentPage);

		})

	},
	pageList(url,currentPage) {

		var showPage = 5;

		Lizard.ajax({
			type: 'POST',
			url: url,
			data:{
				page:currentPage
			},
			success: function (data) {

				var totalPage = data.total_page;

				var pageSize = data.page_size;

				var totalCount = data.total_count;

				var iPage = common.getPage(currentPage,showPage);

				var list = data.results;

				var pagination = {
					showPage:showPage,
					totalPage:totalPage,
					page:currentPage,
					iPage:iPage,
					pathName:location.pathname,
					isFirstPage: (currentPage - 1 ) == 0,
					isLastPage: currentPage * pageSize > totalCount
				}

				var html = ejs.render(window.paginationTpl,pagination);

				$('.pagination_list').html(html);

				var listHtml = ejs.render(window.listTpl,{list:list});

				$('.cont_list').html(listHtml);

			}
		})
	}
}

module.exports = pagination;
