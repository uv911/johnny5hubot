pugs = [
  "http://38.media.tumblr.com/076aebb944f6a19bfa1ae4d82b355fed/tumblr_n7p1mmtIz71r3gb3zo1_400.gif",
  "http://31.media.tumblr.com/741eebca8865bdbc7ac7af23db6adc1d/tumblr_n7p1mmtIz71r3gb3zo2_400.gif",
  "http://37.media.tumblr.com/a0730380fdcc69a0cdbfec82e03ead8e/tumblr_n7p1mmtIz71r3gb3zo3_400.gif",
  "http://38.media.tumblr.com/4504d1a9ee49ca3725ea1f55f2c009ea/tumblr_n7p1mmtIz71r3gb3zo4_400.gif",
  "http://38.media.tumblr.com/0e95c2fd647c640b727e1d0103bf6253/tumblr_n7p1mmtIz71r3gb3zo5_400.gif",
  "http://38.media.tumblr.com/89d68c250a2b79295c1ef1b5e368198f/tumblr_n7p1mmtIz71r3gb3zo6_400.gif",
  "http://37.media.tumblr.com/05f5c40cb0a132868fd7a1a8eaa6e55b/tumblr_n7p1mmtIz71r3gb3zo7_400.gif",
  "http://37.media.tumblr.com/63607822541d0ed463fee5adc5dd68ef/tumblr_n7p1mmtIz71r3gb3zo8_400.gif"
]

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

  console.log("********************************** @johnny5 is alive!!! **********************************");



  /*
   * To Test enter
   * @johnny5 please welcome @robocop @data and @kitt
   */
  //johnny5.hear(/.+/, function(res) {
  johnny5.hear(/please welcome (.*)/i, function(res) {
    var msg = res.match[0];
    var members = res.match[1];

    console.log("@johnny5.hear response values - match[0]: " + msg + " match[1]: " + members);
    //console.log("@johnny5.hear hear everything response values - 0: " + msg);

    return res.send(formatNewMemberOutput(members));
  });

  johnny5.hear(/badger/i, function(res) {
    res.send("Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS");
  });

  johnny5.respond(/open the pod bay doors/i, function(res) {
    var returnMsg = "I hear you want '" + res.match[0] + "'...  I'm afraid I can't let you do that for you.";
    console.log(returnMsg);
    res.reply(returnMsg);
  });

  johnny5.respond(/I am feeling(.*)/i, function(res) {
    var emotion = res.match[1];
    var returnMsg = "I hear you loud and clear... you are feeling " + emotion +
      ".\n\n Maybe you should reconsider your emotions.\n\n" + pugs[chooseRandomPosition(pugs)];

    console.log(returnMsg);
    res.reply(returnMsg);
  });

  johnny5.hear(/Listen I am feeling(.*)/i, function(res) {
    var emotion = res.match[1];
    if(emotion && emotion.trim().length == 0) emotion = "nothing";

    var returnMsg = "I AM LISTENING!!!  I hear you loud and clear... you are feeling " + emotion +
      ".\n\n Maybe you should reconsider your emotions.\n\n" + pugs[chooseRandomPosition(pugs)];

    console.log(returnMsg);
    res.send(returnMsg);
  });

  function formatNewMemberOutput(members) {
    return "Welcome " + formatNames(buildNamesArrayFromString(members)) + ".  Have a glorious day!!!";
  }

  function buildNamesArrayFromString(str) {
    var names = str.match(/@[a-zA-Z0-9]*/g);

    return names;
  }



  function formatNames(namesArray) {
    var val = "<" + namesArray.join(">, <") + ">";
    return val.substring(0, val.lastIndexOf(",")) + " and " + val.substring(val.lastIndexOf(",") + 2, val.length);
  }

  function chooseRandomPosition(array) {
    if(isArray(array)) {
      // get random position
      return getRandomIntInclusive(0, array.length - 1);
    }
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function isArray(array) {
    if (array instanceof Array) {
      return true;
    } else {
      console.log("Unable to choose from NON-Arrays");
      return false;
    }
  }

}
