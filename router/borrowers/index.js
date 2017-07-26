
var router = require('koa-router')();

var baseModel = require('../../model/baseModel');

router.get('/', async (ctx,next) => {


	await ctx.render('borrowers',{
		pathName: ctx.path
	})

})

module.exports = router;
