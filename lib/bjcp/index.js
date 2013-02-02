var bjcp = require('./bjcp.json');

var check = function(value, filter){
    if(value == undefined){
	return false;
    }else if(typeof(value) == 'string'){
	return filter.test(value);
    } else if(value instanceof Object){
	var passes = false;
	for(var i in value){
	    passes = passes || check(value[i], filter);
	}
	return passes;
    }

    return true;
};

module.exports = function(server){
    server.get('/bjcp/', function(req, res){
	    var filter = req.params || {};
	    for(var key in filter){
		filter[key] = new RegExp(filter[key], 'ig');
	    }

	    if(filter == {}){
		res.json(bjcp);
		return;
	    }

	    var results = [];
	    for(var i in bjcp){
		var passes = true;
		for(var key in filter){
		    passes = passes && check(bjcp[i][key], filter[key]);
		    if(!passes){
			break;
		    }
		}
		if(passes){
		    results.push(bjcp[i]);
		}
	    }

	    res.json(results);
	});
};
