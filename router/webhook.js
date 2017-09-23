var router = require('koa-router')();

var release = require('../release');

router.get('/', async (ctx,next) => {

	release();


})

module.exports = router;