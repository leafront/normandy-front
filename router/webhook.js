var router = require('koa-router')();

var exec = require('child_process').exec;

router.post('/', async (ctx,next) => {


	console.log(JSON.stringify(ctx.request,null,2));

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