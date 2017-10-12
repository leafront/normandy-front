var Client = require('ssh2').Client;

var conn = new Client();

var exec = require('child_process').exec;

conn.on('ready', function() {

	conn.exec('/usr/share/nginx/normandy_front/front/release.sh yeliang', function(err, stream) {
		if (err) {

			if (err) {
				throw new Error(err);

				throw err;
			}
		}

		stream.on('close', function (code, signal) {

			console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);

			conn.end();

		}).on('data', function (data) {

			console.log('STDOUT: ' + data);

		}).stderr.on('data', function (data) {

			console.log('STDERR: ' + data);

		})
	})

}).connect({
	host: '116.62.246.98',
	port: 22,
	username: 'root',
	privateKey: require('fs').readFileSync('/Users/leafrontye/.ssh/id_rsa')
})

