var router = require('koa-router')();

var exec = require('child_process').exec;

router.post('/', async (ctx,next) => {

	const header = ctx.request.header;

	const token = header["x-gitlab-token"];

	if (token == "leafront") {

		ctx.body = 'release success';

		exec('/usr/share/nginx/normandy_front/front/release.sh',(err, stdout, stderr) =>{

			if (err) {

				console.log(err);

				throw new Error(err);

			}

			console.log(stdout);

		})

		console.log('release success!');

	}

})

module.exports = router;