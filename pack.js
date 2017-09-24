var exec = require('child_process').exec;

function pack () {

	var promise = new Promise((resolve,reject) => {

		exec('NODE_ENV=production gulp ejs sass',(err, stdout, stderr) =>{

			if (err) {

				console.log(err);

				throw new Error(err);

			}

			resolve(stdout);

			console.log(stdout);

		})

	})

	return promise;


}

pack().then(() => {

	exec('NODE_ENV=production BABEL_ENV=production webpack -p',(err, stdout, stderr) =>{

		if (err) {

			console.log(err);

			throw new Error(err);

		}

		console.log(stdout);

	})

}).catch((err) =>{

	console.log(err);

})





