var $ = require('../lib/jquery');

var common = require('../common');

var Lizard = require('../widget/lizard');

var Vue =  require('../lib/vue');

var vueConfig = new Vue({

	el:'#popup',
	data:{
		stage: 5,
		isStage:false,
		repay_schema:[
			{"term":1,"interest":"","capital":""},
			{"term":2,"interest":"","capital":""},
			{"term":3,"interest":"","capital":""},
			{"term":4,"interest":"","capital":""},
			{"term":5,"interest":"","capital":""}
		],
		dropMenu:[
			{isOpen:false,value:'请选择'},
			{isOpen:false,value:'请选择'},
			{isOpen:false,value:'请选择'},
			{isOpen:false,value:'请选择'},
			{isOpen:false,value:'请选择'}
		]
	},
	methods: {



	},

	mounted (){

		common.headerMenu();

	}

})



