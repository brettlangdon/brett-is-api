var conversions = {
    // Tempurature
    'fahrenheit': {
	'celsius': function(value){
	    value -= 32;
	    value *= 5
	    value /= 9;
	    return value;
	},
    },
    'celsius': {
	'fahrenheit': function(value){
	    value *= 9;
	    value /= 5;
	    value += 32;
	    return value;
	},
    },

    // Liquid Volume
    'gallon': {
	'cup': function(value){
	    return value * 16;
	},
	'liter': function(value){
	    return value * 3.78541178;
	},
	'pint': function(value){
	    return value * 8;
	},
	'milliliter': function(value){
	    return value * 3785.41178;
	}
    },
    'cup': {
	'gallon': function(value){
	    return value / 16;
	},
	'liter': function(value){
	    return (value / 16) * 3.78541178;
	},
	'pint': function(value){
	    return value / 2;
	},
	'milliliter': function(value){
	    return value * 236.588237;
	},
    },
    'liter': {
	'gallon': function(value){
	    return value / 3.78541178;
	},
	'cup': function(value){
	    return (value / 3.78541178) * 16;
	},
	'pint': function(value){
	    return (value / 3.78541178) * 8;
	},
	'milliliter': function(value){
	    return value * 1000;
	},
    },
    'milliliter': {
	'gallon': function(value){
	    return value / 3785.41178;
	},
	'cup': function(value){
	    return value / 236.588;
	},
	'pint': function(value){
	    return value / 473.176;
	},
	'liter': function(value){
	    return value / 1000;
	},
    },
    'pint': {
	'gallon': function(value){
	    return value * 0.125;
	},
	'cup': function(value){
	    return value * 2;
	},
	'liter': function(value){
	    return value * 0.473176;
	},
	'milliliter': function(value){
	    return value * 473.176;
	},
    },

    // Weight
    'pound': {
	'ounce': function(value){
	    return value * 16;
	},
	'gram': function(value){
	    return value * 453.592;
	},
    },
    'ounce': {
	'pound': function(value){
	    return value / 16;
	},
	'gram': function(value){
	    return value * 28.3495;
	},
    },
    'gram': {
	'ounce': function(value){
	    return value / 28.3495;
	},
	'pound': function(value){
	    return value  / 453.592;
	},
    },
};



return module.exports = function(server){
    server.get('/units', function(req, res){
	var can_convert = {};
	for(var from in conversions){
	    can_convert[from] = [];
	    for(var to in conversions[from]){
		can_convert[from].push(to);
	    }
	}

	res.writeHead(200, {
	    'Content-Type': 'application/javascript'
	});
	res.end(JSON.stringify(can_convert));
    });

    server.get(/\/units\/([0-9]+(\.[0-9]+)?)\/([a-zA-Z]+)\/to\/([a-zA-Z]+)/i, function(req, res){
	var value = parseFloat(req.params[0]);
	var from = req.params[2].toLowerCase();
	var to = req.params[3].toLowerCase();

	var answer = {
	    'convert': value,
	    'from': from,
	    'to': to,
	    'result': undefined,
	    'error': undefined
	};
	if(from in conversions && to in conversions[from]){
	    answer['result'] = conversions[from][to](value);
	} else{
	    answer['error'] = 'There is no conversion from ' + from + ' to ' + to;
	}

	res.writeHead(200, {
	    'Content-Type': 'application/javascript'
	});
	res.end(JSON.stringify(answer));
    });
};
