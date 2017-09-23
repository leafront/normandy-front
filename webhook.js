var http = require('http')

http.createServer(function(req, res) {
	handler(req, res, function(err) {
		res.statusCode = 404
		res.end('no such location')
	})
}).listen(7777)

