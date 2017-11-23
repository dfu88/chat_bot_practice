var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');
var cognitive = require('./controller/CustomVision');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "5f4f5e37-f1fb-490a-8685-ca1616ae7c0d",
    appPassword: "muI898*@}ngdelZDOVEG96#"
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var lastSaid = "";

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
   // session.send("You said: %s", session.message.text);

    if (lastSaid == session.message.text){
        session.send("You said that already");
    } else {
        session.send("You said: " + session.message.text);
    }

    lastSaid = session.message.text;
});

// This line will call the function in your LuisDialog.js file
luis.startDialog(bot);