var $ = require('./lib/jquery');

var Lizard = require('./widget/lizard');

var ejs = require('./lib/ejs');

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

			$('.header_notice').toggle();

		})

		//退出登录

		$('.js_logout').click(function(){

			Lizard.clearCookie();

			location.href = '/user/login';

		})

		//用户信息

		$('.js_user').click(function(){

			$('.user_info').toggle();

		})

		getMessage();

		function getMessage(){

			var userName = $('.authority_name').text();

			Lizard.ajax({
				type:'POST',
				url:'/user/message',
				success:function(data){

					var msgList = data.content;

					if(data && msgList.length){


						var msgHtml='\
							<% msgList.forEach(function(item){%>\
								<dd>\
									<img src="https://imgthisisdashcdn-83chedai-com.alikunlun.com/identicons/135.png" class="notice_img fl"/>\
									<div class="notice_cont fr">\
									<div class="notice_txt">\
									<strong><%-userName%></strong>\
									<time><%-getDateDiff(item.created_at)%></time>\
									</div>\
									<p><%-item.content%></p>\
								</div>\
								</dd>\
							<%})%>';

						var html = ejs.render(msgHtml,{msgList:msgList,getDateDiff:Lizard.getDateDiff,userName:userName});

						$('.notice_list').html(html);

						$('.js_msgNume').show();

						$('.js_msgNume').text(msgList.length);

					} else {

						$('.js_msgNume').text('0');

						$('.notice_list').html('<dd><p>当前无信息</p></dd>');
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
	getPage: function (page,showPage) {

		var iPage = 0;

		if ((page % showPage) == 0){

			iPage = Math.floor((page / showPage -1)) * showPage;

		} else {

			iPage = Math.floor(page / showPage) * showPage;

		}

		return iPage

	},
	dropMenu: function  () {

		$('.js_select').click(function(e){

			e.stopPropagation();

			$(this).removeClass('active');

			$(this).parent('.drop_menu').toggleClass('active');

		})

		$('.drop_menu_list').on('click','li',function(e){

			e.stopPropagation();

			$(this).parent().prev('.js_select').text($(this).text()).addClass('active').parents('.drop_menu').removeClass('active');

		})

		$(document).click(function(){
			$('.drop_menu').removeClass('active');

		})
	},

	clearForm(){

		document.getElementById('form').reset();


	},
	updateVerify: function(){
		Lizard.ajax({
			type: 'POST',
			gateway:'gatewayExt',
			url: '/user/verify',
			success: function (data) {

				$('#captcha-img').attr('src',data.img_url);

				$('#captcha_key').val(data.key);

			}
		})
	}
}

module.exports = common;
