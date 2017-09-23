
var exec = require('child_process').exec;

function release () {

	exec('/usr/share/nginx/normandy_front/front/release.sh',(err, stdout, stderr) =>{

		if (err) {

			throw new Error(err);

		}

		console.log(stdout);
		

	})

}

module.exports = release;



