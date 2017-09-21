/**
 * @param options
 * @returns {Page.init}
 * @constructor
 */


function Page(options){

	return new Page.prototype.init(options);
}

Page.prototype = {

	constructor: Page,  // 修改构造器的指向

	init (options){

		options.ajax && options.ajax();

	  options.onShow && options.onShow();

		options.bindEvents && options.bindEvents();

	}
}

module.exports = Page;
