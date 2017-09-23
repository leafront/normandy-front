var router = require('koa-router')();

var exec = require('child_process').exec;

router.get('/', async (ctx,next) => {

	ctx.body = 'release success';

	exec('/usr/share/nginx/normandy_front/front/release.sh',(err, stdout, stderr) =>{

		if (err) {

			throw new Error(err);

		}

		console.log(stdout);


	})

 console.log('release success!!!!');

})

module.exports = router;