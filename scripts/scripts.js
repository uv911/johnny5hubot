module.exports = function(johnny5) {

   /*
    * Setup Heroku commands
    * heroku login
    * heroku create jim
    * heroku create johnny5-jsr17
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
  
  johnny5.hear(/.+/, function(res) {
    var msg = res.match[0];
    console.log("0: " + res.match[0] + " 1 " + res.match[1]);

    return res.send(processMessage(msg));
  });

  function processMessage(msg) {
    console.log("Called processMessage with message " + msg);

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

  function formatNewMemberOutput(findStr, msg) {
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
