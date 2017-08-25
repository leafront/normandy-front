var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var popup = require('../widget/popup');

var Vue =  require('../lib/vue');

var vueConfig = new Vue({

	el:'#app',
	methods: {

		showPopup (ele){

			popup.showContent(ele);

		}
	}

})



var popupConfig = new Vue({

	el:'#addPopup',
	data:{
		stage: 5,
		isStage:false,
		dropMenu:-1,
		params: {type:""},
		repay_schema:[
			{"term":1,"interest":"","capital":""},
			{"term":2,"interest":"","capital":""},
			{"term":3,"interest":"","capital":""},
			{"term":4,"interest":"","capital":""},
			{"term":5,"interest":"","capital":""}
		]
	},
	methods: {

		hidePopup (ele) {

			popup.hideContent(ele);

		},

		selectValue (value) {

			var dropMenu  = this.dropMenu;

			if (dropMenu == value) {

				this.dropMenu = -1;

			} else {

				this.dropMenu = value;
			}

		},
		checkValue (property, value) {

			this.params[property] = value;

		}

	},

	mounted (){

		common.headerMenu();

		$(document).click(() =>{

			this.dropMenu = -1;

		})

	}

})



