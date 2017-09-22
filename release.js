

var Client = require('ssh2').Client;

var conn = new Client();

conn.on('ready', function() {

	conn.exec('/usr/share/nginx/normandy_front/front/release.sh', function(err, stream) {

			if (err) throw err;
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

