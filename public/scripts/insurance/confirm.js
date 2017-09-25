var lizard = require('../widget/lizard');

var common = require('../common');

var Vue = require('../lib/vue');

var popup = require('../widget/popup');

var vueConfig = new Vue ({
	el:'#app',
	data:{

	},
	methods:{

		showPopup (ele) {

			popup.showContent(ele);

		},


	},
	computed:{


	},
	mounted () {

		common.headerMenu();

	}
})

var uploadConfig = new Vue ({
	el: '#uploadPopup',
	data: {

	},
	methods: {

		hidePopup (ele) {

			popup.hideContent(ele);

		}
	}
})

var popupConfig = new Vue ({

	el:'#popup',
	data:{

	},
	methods: {

	  hidePopup (ele) {

			popup.hideContent(ele);

		}
	}
})