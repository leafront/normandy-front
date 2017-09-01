
var $ = require('../lib/jquery');

var popup = {

	showContent (ele){ //显示弹层

		$('.popup_mask').addClass('active');

		$(ele).addClass('active');

		$('body').addClass('overflow');

 },

	hideContent (ele){ //隐藏弹层

		$('.popup_mask').removeClass('active');

		$(ele).removeClass('active');

		$('body').removeClass('overflow');

	}
}

module.exports = popup;