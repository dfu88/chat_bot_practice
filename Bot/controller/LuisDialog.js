var builder = require('botbuilder');
var food = require("./FavouriteFood");
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/a8631581-e0a2-42b5-977d-a00fa9e6457a?subscription-key=745456b351264479a9463365244befec&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('getCalories', function (session, args) {
        session.send("Get calories intent found");
    }).triggerAction({
        matches: 'getCalories'  
    });

    bot.dialog('WantFood', function (session, args) {
        session.send("Want food intent found");
    }).triggerAction({
        matches: 'WantFood'  
    });

    bot.dialog('GetFavouriteFood', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
           // if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving your favourite foods");
                food.displayFavouriteFood(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            //}
        }
    ]).triggerAction({
        matches: 'GetFavouriteFood'
    });

    bot.dialog('WelcomeIntent', function (session, args) {
        session.send("Hi Dylan!");
    }).triggerAction({
        matches: 'WelcomeIntent'  
    });
}