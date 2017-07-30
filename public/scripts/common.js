/**
 * Created by leafrontye on 2017/7/26.
 */

define(
	[
	'jquery',
	'Lizard',
	'ejs'
],
	function(
		$,
		Lizard,
		ejs
	){

		var common = {

			headerMenu: function(){

				$('.js_narrow').click(function(){

					$('.header-logo').toggleClass('header_menu_scale');

					$('.aside-menu').toggleClass('header_menu_scale');

					$('.header_logo_img').toggle();

					$('.js_nav_link').toggle();

					$('.header-top').toggleClass('header_menu_toggle');

					$('.right-container').toggleClass('header_menu_toggle');

				})


				$('.container').css('height',$(window).height());

				$('.right-container').css('min-height',$(window).height());

				$('.header_message_list li').click(function(){

					getMessage();

				})

				//退出登录

				$('.js_logout').click(function(){

					Lizard.clearCookie();

					window.location.reload();

				})

				//用户信息

				$('.js_user').click(function(){

					$('.user_info').toggle();

				})

				function getMessage(){

					Lizard.ajax({
						url:'/api/current-user/unread-msgs',
						type:'GET',
						success:function(data){
							var msgHtml='\
							<% msgList.forEach(function(item){%>\
								<dd>\
									<img src="https://imgthisisdashcdn-83chedai-com.alikunlun.com/identicons/135.png" class="notice_img fl"/>\
									<div class="notice_cont fr">\
									<div class="notice_txt">\
									<strong>黄丽莎</strong>\
									<time><%-getDateDiff(item.created_at)%></time>\
									</div>\
									<p><%-item.content%></p>\
								</div>\
								</dd>\
							<%})%>';

							$('.header_notice').toggle();

							if(data.content && data.content.length > 0){

								$('.notice_list').data('isrender',1);

								var html = ejs.render(msgHtml,{msgList:data.content,getDateDiff:Lizard.getDateDiff});

								$('.notice_list').html(html);

							}

						}
					})

				}
			},
			getVerify: function () { //获取验证码

				$('#captcha-img').click(function(){

					common.updateVerify();

				})
			},
			updateVerify: function(){
				Lizard.ajax({
					type: 'POST',
					gateway:'gatewayExt',
					url: '/api/captcha',
					success: function (data) {

						$('#captcha-img').attr('src',data.img_url);

						$('#captcha_key').val(data.key);

					}
				})
			}
		}

		return common;
})