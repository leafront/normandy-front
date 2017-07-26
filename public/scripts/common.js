/**
 * Created by leafrontye on 2017/7/26.
 */

define(
	[
	'jquery'
],
	function(
		$
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
			}
		}

		return common;
})