var router = require('koa-router')();

var release = require('../release');

router.get('/', async (ctx,next) => {

	release();

	ctx.status =  404;

})

module.exports = router;