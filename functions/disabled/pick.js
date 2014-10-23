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

var main = function (irc, data) {
	var o = data.params.split(" ");
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o.join(" > ");
}

module.exports.main = main;