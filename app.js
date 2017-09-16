/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/
var builder = require('botbuilder');
var restify = require('restify');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */
var Goals = {
    loseWeight: 'Hotels',
    Flights: 'Flights',
    Support: 'Support'
};
// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector, [
    function(session) {
        session.send("Hi I am BOT NAME! I am here to help you achieve your health goals.");
    builder.Prompts.text(session, "Let's get started! What is your name?");
    },
 function (session, results) {
     session.send("Hi " + results.response + ", what is your goal? (e.g. build muscle)");
session.endDialog();
 
 }]);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

var LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;
LuisModelUrl ='https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4303b6a9-a253-4cc2-ba4f-08d3d0adcc44?subscription-key=9446a30bcfd9498e87e2f5cdba1e5fe0';
// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer]});

/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/

intents.matches('loseWeight', '/loseweight');

// .onDefault((session) => {
//     session.send('Sorry, I did not understand \'%s\'.', session.message.text);
// });
intents.onDefault('/confused');
//bot.dialog('/', intents);
bot.dialog('/confused', [function (session,args,next) {
    session.send(LuisModelUrl);
    session.endDialog('sorry, I do not understand.');
}]);
bot.dialog('/loseweight', [
    function (session, args, next) {
        // ToDo: need to offer an option to say "help"
        session.send('I would love to help you lose some weight!'); }]);

