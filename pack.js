var exec = require('child_process').exec;

var isEnviroment = process.argv[2];

var enviroment = [
	{
	  webpack: { 'dev': 'npm run dev', 'production': 'npm run build'},
	  name:'webpack'
  },
	{
	 gulp: {'dev': 'gulp',  'production': 'NODE_ENV=production gulp ejs sass'},
	 name:'gulp'
  }
];


function pack () {

	var promise = new Promise((resolve,reject) => {

		exec('git checkout dev && git pull',(err, stdout, stderr) =>{

			if (err) {

				throw new Error(err);

			}

			resolve(stdout);

			console.log(stdout);

		})

	})

	return promise;

}

pack().then(() => {

	enviroment.forEach((item) => {

		console.log(item[item.name][isEnviroment])

		exec(item[item.name][isEnviroment],(err, stdout, stderr) =>{

			if (err) {

				throw new Error(err);
			}

			console.log(stdout);

		})

	})

}).catch((err) =>{

	console.log(err);

})




