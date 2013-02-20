var units = require('node-units');

// might as well cache this so we dont have to compute every time
// the list of available units will only change once we restart
var available = {};
var db = units.getDB();
for(var group in db){
    available[group] = Object.keys(db[group]);
}

return module.exports = function(server){
    server.get('/units', function(req, res){
	res.writeHead(200, {
	    'Content-Type': 'application/javascript'
	});
	return res.end(JSON.stringify(available));
    });

    server.get(/units\/type\/([a-zA-Z]+)/i, function(req, res){
	var result = units.getUnitType(req.params[0]);
	res.writeHead(200, {
	    'Content-Type': 'application/javascript',
	});
	return res.end(JSON.stringify(result));
    });

    server.get(/\/units\/(.*?)\/([a-zA-Z]+)\/to\/([a-zA-Z]+)/i, function(req, res){
	var value = decodeURIComponent(req.params[0]);
	var from = req.params[1];
	var to = req.params[2];

	var answer = {
	    'convert': value,
	    'from': from,
	    'to': to,
	    'result': undefined,
	    'error': undefined
	};
	try{
	    answer['result'] = units.convert(value + ' ' + from + ' to ' + to);
	} catch(e){
	    answer['error'] = e;
	}

	res.writeHead(200, {
	    'Content-Type': 'application/javascript'
	});
	return res.end(JSON.stringify(answer));
    });
};
