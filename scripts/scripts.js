module.exports = function(johnny5) {

   /*
    * Setup Heroku commands
    * heroku login
    * heroku create jim
    * heroku create johnny5-jsr17
    *
    * Sonyl like using the git protocol command instead of the https one
    * git remote add heroku https://git.heroku.com/johnny5-jsr17.git
    * heroku config:add HEROKU_URL=https://johnny5-jsr17.herokuapp.com
    * heroku config:add HUBOT_SLACK_TOKEN=<my token>
    *
    * Wake up my bot on Heroku
    * https://devcenter.heroku.com/articles/scaling
    *
    * Go to the home dir of your git repo for myhubot code
    * cd /Users/SysAdmin/Sites/slackBotProject/myhubot
    * heroku ps:scale web:1
    *
    * View logs to look for errors or make sure @johnny5 comes up
    * heroku logs
    *
    * Checking new code
    * https://dashboard.heroku.com/apps/johnny5-jsr17/deploy/heroku-git
    * git add .
    * git commit -m "Commit msg"
    * git push heroku master
    *
    */

//  johnny5.hear1(/Hello!/, function(res) {
//    return res.send("Hi Johnny5 is there!");
//  });

  console.log("@johnny5 is alive!!!");

  //johnny5.hear(/.+/, function(res) {
  johnny5.hear(/please welcome (.*) doors/i, function(res) {
    var msg = res.match[0];
    var members = res.match[1];

    console.log("@johnny5.hear response values - 0: " + msg + " 1 " + members);
    //console.log("@johnny5.hear hear everything response values - 0: " + msg);

    return res.send(processMessage(msg, members));
  });

  johnny5.hear(/badger/i, function(res) {
    res.send("Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS");
  });

  johnny5.respond(/open the pod bay doors/i, function(res) {
    res.reply("I'm afraid I can't let you do that.");
  });

  function processMessage(msg, members) {
    console.log("Called processMessage with message " + msg + " with members " + members);

    /*
     * To Test enter
     * @johnny5 please welcome @robocop @data and @kitt
     */
    var welcomeKey = "please welcome";
    if(isWelcomeNewMemberMsg(welcomeKey, msg)) {
      return formatNewMemberOutput(welcomeKey, msg)
    }


  }
  function isWelcomeNewMemberMsg(findStr, msg) {
    return (msg.toLowerCase().lastIndexOf(findStr.toLowerCase()) > 0);
  }

  function formatNewMemberOutput(members) {
    return "Welcome " + formatNames(buildNamesArrayFromString(members)) + ".  Have a glorious day!!!";
  }

  function formatNewMemberOutputOld(findStr, msg) {
    var start = msg.toLowerCase().lastIndexOf(findStr.toLowerCase()) + findStr.length + 1;
    var names = msg.substring(start, msg.length);

    return "Welcome " + formatNames(buildNamesArrayFromString(names)) + ".  Have a glorious day!!!";
  }

  function buildNamesArrayFromString(str) {
    var names = str.match(/@[a-zA-Z]*/g);

    return names;
  }



  function formatNames(namesArray) {
    var val = "<" + namesArray.join(">, <") + ">";
    return val.substring(0, val.lastIndexOf(",")) + " and " + val.substring(val.lastIndexOf(",") + 2, val.length);
  }
}
