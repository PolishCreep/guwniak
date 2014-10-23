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
	return data.params.split(" ").sort(function () { return .5 - Math.random() }).join(" > ");
}

module.exports.main = main;