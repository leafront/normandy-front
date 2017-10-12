
var router = require('koa-router')();

router.get('/', async (ctx,next) => {

	const key = ctx.params.key;

	await ctx.render('activate',{
		activate_key:key
	})

})

module.exports = router;