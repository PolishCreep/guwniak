/*
	data = {
		nickname 	- nickname 						| nickname!*@*
		name		- server name 					| *!name@*
		hostname	- hostname 						| *!*@hostname
		channel		- channel						| #channel
		message		- entire message with command 	| !_example arg1 arg2
		params		- message without command 		| arg1 arg2
	};
*/

var appId = '0f06226d284f8c26ab89fed117b1528b';

var main = function (irc, data) {
	var request = require('request');
	/*var options = {
		host: 'api.openweathermap.org',
		path: '/data/2.5/weather?q='+encodeURIComponent(data.params),
	};*/
	
	request("http://api.openweathermap.org//data/2.5/weather?units=metric&q="+encodeURIComponent(data.params), 
		function (error, response, body) {
			var weather = JSON.parse(body);
			var reply = "Pogoda dla {0}: Temperatura: {1}*C, Wiater: {2}m/s, Cisnienie: {3}hPa, Zachmurzenie: {4}%".
				format(weather.name, weather.main.temp, weather.wind.speed, weather.main.pressure, weather.clouds.all);
			console.log(weather);
			irc.sendMessage(data.channel, reply);
		}
	);
}

module.exports.main = main;