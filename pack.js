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
  },
	{
	 node: {'dev': 'pm2 kill && npm start', 'production': 'pm2 kill && npm run production'},
	 name:'node'
 }
];

enviroment.forEach((item) => {

	console.log(item[item.name][isEnviroment])

	exec(item[item.name][isEnviroment],(err, stdout, stderr) =>{

		if (err) {

			throw new Error(stdout);
		}

		console.log(stdout);

	})

})


