var router = require('koa-router')();

var release = require('../release');

router.get('/', async (ctx,next) => {

	ctx.body = 'release success';

	release();

 console.log('release success');
 
})

module.exports = router;