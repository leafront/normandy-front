var router = require('koa-router')();


router.get('/', async (ctx,next) => {

	ctx.body = ctx.request.body;


console.log(ctx.request.body);


})

module.exports = router;