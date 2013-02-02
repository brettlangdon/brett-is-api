var respond = function(res, answer){
    res.writeHead(200,{
	'Content-Type': 'application/javascript'
    });
    return res.end(JSON.stringify(answer));
};

module.exports = function(server){
    server.get('/time/epoch', function(req, res){
	return respond(res, parseInt(new Date().getTime()/1000));
    });

    server.get('/time/utc', function(req,res){
	var answer = {};
	var now = new Date();
	answer.epoch = parseInt(now.getTime()/1000);
	answer.month = now.getUTCMonth()+1;
	answer.day = now.getUTCDate();
	answer.year = now.getUTCFullYear();
	answer.hours = now.getUTCHours();
	answer.minutes = now.getUTCMinutes();
	answer.seconds = now.getUTCSeconds();
	answer.milliseconds = now.getUTCMilliseconds();
	answer.day_of_week = now.getUTCDay();
	return respond(res, answer);
    });

    server.get('/time',  function(req, res){
	var answer = {};
	var now = new Date();
	answer.epoch = parseInt(now.getTime()/1000);
	answer.month = now.getMonth()+1;
	answer.day = now.getDate();
	answer.year = now.getFullYear();
	answer.hours = now.getHours();
	answer.minutes = now.getMinutes();
	answer.seconds = now.getSeconds();
	answer.milliseconds = now.getMilliseconds();
	answer.day_of_week = now.getDay();
	answer.timezone_offset = -(now.getTimezoneOffset()/60);
	return respond(res, answer);
    });
};
