var net = require('net');

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

connectionData = {
	host: 'irc.rizon.net',
	port: 6667,
	nick: 'nowy_lepszy_guwniak',
	channel: '#kumple',
	disconnectMessage: 'wy keki',
};

var Irc = function () {
	this.handle = null;
	this.options = {};
	this.start = function () {
		this.handle = net.connect(this.options.port, this.options.host);
		this.handle.setEncoding('utf8');
		this.handle.on('connect', this.onConnect.bind(this));
		this.handle.on('data', this.onData.bind(this));
	};
	this.setUser = function () {
		this.sendServerMessage("NICK " + this.options.nick);
		this.sendServerMessage("USER " + this.options.nick + " 0 * :Edik");	
	};
	this.sendServerMessage = function (msg) {
		console.log(msg);
		this.handle.write(msg + "\r\n");
	};
	this.sendMessage = function (channel, msg) {
		this.handle.write("PRIVMSG " + channel + " :" + msg + "\r\n");
	};
	this.joinToChannel = function (channel) {
		this.sendServerMessage("JOIN " + channel);
	};
	this.disconnect = function () {
		this.sendServerMessage("QUIT :" + this.options.disconnectMessage);
	};
	this.delayedCommands = function () {
		this.joinToChannel(this.options.channel);
	};
	this.parseData = function (data) {
		var serverData = data.split(" ");
		if (serverData[0] == "PING") {
			this.sendServerMessage("PONG "+serverData[1]);
			return;
		}
	
		var parsedData = /\:(.+?)\!\~(.+?)@(.+?) PRIVMSG (.+?) :(.+?)\r\n/i.exec(data);
		if (parsedData != null) {
			parsedData = {
				nickname: parsedData[1],
				name: parsedData[2],
				hostname: parsedData[3],
				channel: parsedData[4],
				message: parsedData[5],
			};
			if (parsedData.message[0] == "!") {
				parsedData.params = parsedData.message.split(" ");
				var commandName = parsedData.params[0].replace('!', '');
				delete parsedData.params[0];
				parsedData.params = parsedData.params.join(" ").trim();
				try {
					var functionDir = './functions/' + commandName + '.js';
					delete require.cache[require.resolve(functionDir)];
					var response = require(functionDir).main(this, parsedData);
					if (response != undefined) {
						this.sendMessage(parsedData.channel, response);
					}
				} catch (e) {
					console.log("Error in function: " + commandName);
					console.log(e);
				}
			}
		}
	};
	//EVENTS
	this.onConnect = function () {
		this.setUser();
		this.joinToChannel(this.options.channel);
		setTimeout(this.delayedCommands.bind(this), 5000);
	};
	this.onData = function (data) {
		console.log(data);
		this.parseData(data);
	};
};

var IrcClient = new Irc();
IrcClient.options = connectionData;
IrcClient.start();