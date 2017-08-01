/**
 * Created by leafrontye on 2017/7/31.
 */


require([
	'../config'
], function(){
	require([
		'jquery',
		'common'
	], function(
		$,
		common
	){

		common.headerMenu();



		function dropMenu () {

			$('.js_select').click(function(e){

				e.stopPropagation();

				$(this).parent('.drop_menu').toggleClass('active');

			})

			$(document).click(function(){
				$('.drop_menu').removeClass('active');

			})
		}

		dropMenu();
	})
})
