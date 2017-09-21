
var popup = {

	/**
	 * @param {Object} ele
	 * @return null
	 */

	showContent (ele){

		document.querySelector('.popup_mask').classList.add('active');

		document.querySelector(ele).classList.add('active');

		document.body.classList.add('overflow');

 },

	/**
	 * @param {Object} ele
	 * @return null
	 */

	hideContent (ele){

		document.querySelector('.popup_mask').classList.remove('active');

		document.querySelector(ele).classList.remove('active');

		document.body.classList.remove('overflow');

	}
}

module.exports = popup;