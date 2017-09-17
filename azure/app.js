
/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/
var builder = require('botbuilder');
var restify = require('restify');
var request = require('request');

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
// Create your bot with a function to receive messages from the user

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';
var goalType = 0;
var LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;
LuisModelUrl ='https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4303b6a9-a253-4cc2-ba4f-08d3d0adcc44?subscription-key=9446a30bcfd9498e87e2f5cdba1e5fe0';
// Main dialog with LUIS
var bot = new builder.UniversalBot(connector, [function(session) {
    session.beginDialog('/main');}]);
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
bot.recognizer(recognizer);
bot.dialog('/main', [
    // Step 1
    function (session) {
        builder.Prompts.text(session, '**Hi!** I am Nutri.Ai and I\'m here to help improve your health. What is your name?');
    },
    // Step 2
    function (session, results) {
        session.send(`Hello ${results.response}!`);
        builder.Prompts.text(session, 'What goal would you like me to help you work toward *(e.g. build muscle, stay at my current weight, etc.)*');
        session.endDialogWithResult(results);
    }]);
bot.dialog('loseWeight', [
    function (session) {
        session.send('I can definitely help you lose weight!');
        goalType = 1;
         session.beginDialog('afterGoal');
   }
]).triggerAction({
    matches: 'loseWeight',
    onInterrupted: function (session) {
        session.send('Okay nevermind');
    }
});

bot.dialog('keepWeight', [
    function (session) {
        session.send('I can definitely help you stay on top of your fitness!');
        goalType = 2;
        session.beginDialog('afterGoal');
   }
]).triggerAction({
    matches: 'keepWeight',
    onInterrupted: function (session) {
        session.send('Okay nevermind');
    }
});

bot.dialog('gainWeight', [
    function (session) {
        session.send('I can definitely help you put on some muscle!');
        goalType = 3;
         session.beginDialog('afterGoal');
   }
]).triggerAction({
    matches: 'gainWeight',
    onInterrupted: function (session) {
        session.send('Okay nevermind');
    }
});
var gender2;
var weight2;
var activity;
var calories;
var calsRequest;
var ingRequest;
var recBody;
var url;
var title;
var img;
var caloriesResult;
var imgmsg;
var jsonBody;
var headers;
var options;
var calTotal;
var calsBreakfast;
var calsLunch;
var calsDinner;
var calRun;
var aged;
var mealed;
bot.dialog('afterGoal', [
     function (session) {
        builder.Prompts.choice(session, "Gender?", "Male|Female|Other", { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
         gender2 = results.response.entity;
        builder.Prompts.text(session, "What is your age? ");
    },
    function (session, results) {
      aged=results.response;
     builder.Prompts.text(session, "What is your current weight? (lbs)");
    },
    function (session, results) {
        weight2 = results.response * 0.453592;
        builder.Prompts.choice(session, "How often do you exercise?", "Little to no exercise|1–3 Days Per Week|3–5 Days Per Week|6–7 Days Per Week", { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
        activity = results.response.entity;
        var myURL = "https://27653783.ngrok.io/api/user/59bdf91a2e47b06c3ffeb20f/nutrition";
var goal;
var actives;

if (activity == "Little to no exercise") {
    actives = 1.2;
}
else if (activity == "1–3 Days Per Week") {
    actives = 1.375;
}
else if(activity == "3–5 Days Per Week") {
    actives = 1.55;
}
else {
    actives = 1.725;
}
if (goalType == 1) {
     goal = "lose";
}
else if (goalType == 2) {
    goal = "maintain";
}
else {
    goal = "gain";
}
var data = {weight:weight2,gender:gender2,activity:actives,goals:goal
            }     
      request({
          method:'PUT',
          uri: myURL,
          multipart: [{
              'content-type':'application/json',
              body:JSON.stringify(data)
          
          }]
      }, function(error, request, body) {
          console.log(body);
      
      });
       
      if (gender2 == "Male"||"Other") {
          calTotal = 66.5 + (13.75 * weight2) + (5.003 *175) - (6.755 * aged) * actives;
      }
      else {
          calTotal = 655.1 + (9.563 * weight2) + (1.85 *162) - (4.676 * aged) * actives;
      }
         
      session.send("Great! Based on your inputs I have determined "+Math.round(calTotal) +" calories a day will help you meet your goals");
      calRun = calTotal;
      calsBreakfast = Math.round(calTotal/5);
      calRun = calTotal - calsBreakfast;
      calsLunch = Math.round(calRun/3);
      calRun =  calRun - calsLunch;
      calsDinner = Math.round(calRun);
      session.send("I have set the calories limits for your meals as follows: Breakfast: " + calsBreakfast + " calories, Lunch: " + calsLunch + " calories, Dinner: " +calsDinner + " calories.");
  session.endDialog();}
]);
    bot.dialog('breakfast', [
     function (session, args) {
          mealed = 0;
          add = builder.EntityRecognizer.findEntity(args.intent.entities, 'add');
   ingRequest = add.entity; 
    session.beginDialog('meal');
     }]).triggerAction({
    matches: 'breakfast'
});

 bot.dialog('lunch', [
     function (session, args) {
          mealed = 1;
          add = builder.EntityRecognizer.findEntity(args.intent.entities, 'add');
   ingRequest = add.entity; 
    session.beginDialog('meal');
     }]).triggerAction({
    matches: 'lunch'
});

 bot.dialog('dinner', [
     function (session, args) {
          mealed = 2;
          add = builder.EntityRecognizer.findEntity(args.intent.entities, 'add');
   ingRequest = add.entity; 
    session.beginDialog('meal');
     }]).triggerAction({
    matches: 'dinner'
});


 bot.dialog('meal', [ function(session) { 
       request('http://27653783.ngrok.io/api/user/59bdf91a2e47b06c3ffeb20f', (err, res, body) => {
  if (err) { return console.log(err); }
  jsonBody = JSON.parse(body);
   calRun = jsonBody.User.totalCalories;
      calsBreakfast = Math.round(calRun/5);
      calRun = calTotal - calsBreakfast;
      calsLunch = Math.round(calRun/3);
      calRun =  calRun - calsLunch;
      calsDinner = Math.round(calRun);

if (mealed == 0) {
    calsRequest = calsBreakfast
}
if (mealed == 1) {
    calsRequest = calsLunch;
}
if (mealed == 2){
    calsRequest = calsDinner;
}

     headers = {
    'Content-Type':'application/json'}

   options = {
     url: 'https://27653783.ngrok.io/api/meal',
    method: 'POST',
    headers: headers,
    form: {'userId': '59bdf91a2e47b06c3ffeb20f', 'calories': calsRequest ,
        'ingredients' :ingRequest }}
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        jsonBody = JSON.parse(body);
    url = jsonBody.uri;
     title = jsonBody.label;
     img = jsonBody.image;
     session.send(img);
     caloriesResult = jsonBody.calories;
        imgmsg = new builder.Message(session).addAttachment({
       contentUrl: img,
           contentType: 'image/jpg',
           name: 'img2.jpg'});
           session.send(imgmsg);
           caloriesResult = Math.round(caloriesResult);
           session.send("Check out this recipe for " + title + "! it has " + caloriesResult + " calories.");
           session.send(url);
           session.beginDialog('checkCals');
}});});}]);
bot.dialog('checkCals', [ function(session) {
    request('http://27653783.ngrok.io/api/user/59bdf91a2e47b06c3ffeb20f', (err, res, body) => {
  if (err) { return console.log(err); }
  jsonBody = JSON.parse(body);
  session.send("You have " + jsonBody.User.remainingCalories +" calories left today!");
  console.log(body);
  session.endDialog();
        // Print out the response body
      // session.send(body);
     //  session.send("You have " + response.remainingCalories + " calories left today!");
    });}]).triggerAction({
    matches: 'calories'});
var cals;
var add;
var none;

// function calculateCalories(){//gender, weight, goal) {
//     return 1;
// }

// var intents = new builder.IntentDialog({ recognizers: [recognizer]});

// var bot = new builder.UniversalBot(connector, [
//     function(session) {
//         session.send("Hi I am BOT NAME! I am here to help you achieve your health goals.");
//     builder.Prompts.text(session, "Let's get started! What is your name?");
//     },
//  function (session, results) {
//      builder.Prompts.text(session, "Hi " + results.response + ", what is your goal? (e.g. build muscle)");},
// function (session, results) {
//     session.endDialog();
 
//  }]);


// /*
// .matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
// */

// intents.matches('loseWeight', '/loseweight');

// // .onDefault((session) => {
// //     session.send('Sorry, I did not understand \'%s\'.', session.message.text);
// // });
// intents.onDefault('/confused');
// //bot.dialog('/', intents);
// bot.dialog('/confused', [function (session,args,next) {
//     session.send(LuisModelUrl);
//     session.endDialog('sorry, I do not understand.');
// }]);
// bot.dialog('/loseWeight', [
//     function (session, args, next) {
//         // ToDo: need to offer an option to say "help"
//         session.send('I would love to help you lose some weight!'); 
//         session.endDialog();}]).triggerAction({
//             matches: /^loseWeight$/});

