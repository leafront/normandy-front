/**
 * Created by leafrontye on 2017/7/21.
 */
require.config({
	waitSeconds : 15,
	baseUrl: '/scripts',
	paths: {
		'jquery': 'jquery',
		'Lizard':'widget/lizard',
		'config':'config',
		'slider':'widget/slider',
		'local': 'widget/local',
		'common': 'common',
		'template':'lib/template',
		'iScroll':'lib/iScroll'
	},
	shim:{
		'carousel':{
			deps:['jquery']
		},
		'transition':{
			deps:['jquery']
		},
		'zoom':{
			deps:['jquery']
		}

	}
})
