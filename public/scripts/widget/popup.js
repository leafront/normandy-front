
var popup = {

	showContent (ele){ //显示弹层

		document.querySelector('.popup_mask').classList.add('active');

		document.querySelector(ele).classList.add('active');

		document.body.classList.add('overflow');

 },

	hideContent (ele){ //隐藏弹层

		document.querySelector('.popup_mask').classList.remove('active');

		document.querySelector(ele).classList.remove('active');

		document.body.classList.remove('overflow');

	}
}

module.exports = popup;