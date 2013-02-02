var restify = require('restify');

var throttle_settings = { burst: 100,
			  rate: 50,
			  ip: true}

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.throttle(throttle_settings));

require('./bjcp')(server);
require('./time')(server);

server.get('/', function(req, res){
    var answer = {};
    answer.time = {
	'/time': 'get the current date/time as JSON object',
	'/time/epoch': 'get the current epoch time as string',
	'/time/utc' : 'get the current UTC date/time as JSON object',
    };
    answer.bjcp = {
	'/bjcp': 'get the current BJCP style guide as JSON object, to search style guide provide query string parameters' +
	    ', example (/bjcp?id=28A, /bjcp?mouthfeel=tannin)',
    };

    res.writeHead(200, {
	'Content-Type': 'application/javascript'
    });
    return res.end(JSON.stringify(answer));
});

server.listen(process.env.PORT || 8080);
