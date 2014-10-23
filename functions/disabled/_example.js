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

var main = function (irc, data) { // main command - have to be exported - returns reply 
	
	irc.sendMessage(data.channel, data.params); //send reply to server
}

module.exports.main = main;