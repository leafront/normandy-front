/**
 * Created by leafrontye on 2017/7/31.
 */


require([
	'../config'
], function(){
	require([
		'jquery',
		'common',
		'local',
		'ejs'
	], function(
		$,
		common,
		local,
		ejs
	){

		function showMessage(){

			var showPage = 5;

			$('.pagination_list').on('click','.js_page',function(e){

				e.preventDefault();

				var href = $(this).attr('href');

				var page = href.split('?')[1];

				var userId = getUserId();

				if (history.pushState) {

					history.pushState(null,null,href);

				}

				var currentPage = parseInt(page.split('=')[1]);

				Lizard.ajax({
					type: 'POST',
					url: '/message/list',
					data:{
						userId:userId,
						page:currentPage
					},
					success: function (data) {

						var totalPage = data.total_page;

						var pageSize = data.page_size;

						var totalCount = data.total_count;

						var iPage = common.getPage(currentPage,showPage);

						var messageList = data.results;

						var pagination = {
							showPage:showPage,
							totalPage:totalPage,
							page:currentPage,
							iPage:iPage,
							pathName:location.pathname,
							isFirstPage: (currentPage - 1 ) == 0,
							isLastPage: currentPage * pageSize > totalCount
						}

						var html = ejs.render(paginationTpl,pagination);

						$('.pagination_list').html(html);

						var listHtml = ejs.render(listTpl,{messageList:messageList});

						$('.message_list').html(listHtml);

						setReadyStatus();

					}
				})

			})


		}

		function getUserId (){

			var pathName = location.pathname;

			var userId = pathName.split('/')[2];

			return userId;
		}



		function showRead(){

			$('.message_list').on('click','.message_link',function(){

				$(this).parent().find('.sub_message').toggle();

				var id_list = $(this).data('id');

				var $this = $(this);


				var fn = function(){

					$this.parent().removeClass('active');

				}

				readMessage(id_list,fn);

				var jwt = Lizard.getCookie('jwt');

				var org_id = Lizard.getCookie('org_id');


			})

			$('.message_read').click(function(){

				var msg_ids = [];

				$('.message_link').each(function(){

					msg_ids.push($(this).data('id'));

				})

				var fn = function(){

					$('.message_link').each(function(){

						$(this).parent().removeClass('active');
					})
				}

				readMessage(msg_ids,fn);



			})
		}

		function readMessage(msg_ids,fn){

			var userId = getUserId();

			Lizard.ajax({
				url:'/message/read',
				type:'POST',
				data:{
					userId:userId,
					msg_ids:msg_ids
				},
				success:function(data) {

					fn && fn();

					setReadyStatus();


				}
			})
		}

		function setReadyStatus (){

			var iseRead = false

			$('.message_list li').each(function(){

				if ($(this).hasClass('active')) {

					iseRead = false;

					return false;

				}

				iseRead = true;

				return true;

			})


			if (iseRead) {

				if (!$('.message_read').hasClass('active')){

					$('.message_read').addClass('active');

				}
			} else {

				if ($('.message_read').hasClass('active')){

					$('.message_read').removeClass('active');

				}
			}

		}

		common.headerMenu();
		showMessage();
		showRead();

	})
})
