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
    * Old Location -> cd /Users/SysAdmin/Sites/slackBotProject/myhubot
    * New Location -> cd /Home-Data/GeneralAssembly-Projects/JSR911-Projects/slackBotProject/myhubot
    * heroku ps:scale web:1
    *
    * View logs to look for errors or make sure @johnny5 comes up
    * heroku logs
    *
    * Checkin new code
    * https://dashboard.heroku.com/apps/johnny5-jsr17/deploy/heroku-git
    * git add .
    * git commit -m "Commit msg"
    * git push heroku master
    *
    */


  console.log("********************************** @johnny5 is alive today!!! **********************************");

  pugs = [
    "http://www.getpuggedup.com/wp-content/uploads/2014/12/PugDietStartsNextWeek.png",
    "https://vignette3.wikia.nocookie.net/degrassi/images/a/a5/Tumblr_mu9v09yfVy1shy71oo1_500.jpg/revision/latest?cb=20140823001119",
    "https://i.pinimg.com/736x/68/5a/e9/685ae96e0db55512da4a7615a824f92a--pug-dogs-doggies.jpg",
    "https://i.pinimg.com/736x/24/6c/b4/246cb44a42d4d48714b1ef92faf27621--funny-images-funny-animals.jpg",
    "http://www.pugnow.com/wp-content/uploads/2016/03/selfie-angry-pug.jpg",
    "http://www.tshirtvortex.net/wp-content/uploads/fearpug-1.jpg",
    "http://68.media.tumblr.com/a60ba3b5f9fc3e3b0b7b2393a42abedd/tumblr_nne286YYJd1tiokedo1_400.jpg",
    "http://iruntheinternet.com/lulzdump/images/confused-dog-slide-scared-pug-1317174280e.jpg",
    "https://i.pinimg.com/736x/a3/2d/56/a32d56331f7a5751f629ed282bd5c4fc--fat-pug-funny-shit.jpg",
    "http://iruntheinternet.com/lulzdump/images/pug-cat-dog-shocked-surprise-13486177729.jpg",
    "https://i.pinimg.com/736x/fd/b3/f4/fdb3f49592ac52de6246ed4df2907cbd--pug-life-windows.jpg",

    "http://38.media.tumblr.com/076aebb944f6a19bfa1ae4d82b355fed/tumblr_n7p1mmtIz71r3gb3zo1_400.gif",
    "http://31.media.tumblr.com/741eebca8865bdbc7ac7af23db6adc1d/tumblr_n7p1mmtIz71r3gb3zo2_400.gif",
    "http://37.media.tumblr.com/a0730380fdcc69a0cdbfec82e03ead8e/tumblr_n7p1mmtIz71r3gb3zo3_400.gif",
    "http://38.media.tumblr.com/4504d1a9ee49ca3725ea1f55f2c009ea/tumblr_n7p1mmtIz71r3gb3zo4_400.gif",
    "http://38.media.tumblr.com/0e95c2fd647c640b727e1d0103bf6253/tumblr_n7p1mmtIz71r3gb3zo5_400.gif",
    "http://38.media.tumblr.com/89d68c250a2b79295c1ef1b5e368198f/tumblr_n7p1mmtIz71r3gb3zo6_400.gif",
    "http://37.media.tumblr.com/05f5c40cb0a132868fd7a1a8eaa6e55b/tumblr_n7p1mmtIz71r3gb3zo7_400.gif",
    "http://37.media.tumblr.com/63607822541d0ed463fee5adc5dd68ef/tumblr_n7p1mmtIz71r3gb3zo8_400.gif"
  ]

  /*
   * To Test enter
   * @johnny5 please welcome @robocop @data and @kitt
   */
  //johnny5.hear(/.+/, function(res) {
  johnny5.hear(/please welcome (.*)/i, function(res) {
    var msg = res.match[0];
    var members = res.match[1];

    return res.send(formatNewMemberOutput(members));
  });

  /*
   * To test a new user must enter the room
   */
  johnny5.enter(function(res) {
    var enterMsgs = ["Howdy partner!", "Well hello there!", "I see you!"];
    var user = res.message.user.name;
    console.log("A user entered the room: " + user);
    var msg = enterMsgs[chooseRandomPosition(enterMsgs)];
    if (user.trim().toLowerCase().substr(0,6) === "jimmyt" || user.trim().toLowerCase().substr(1,6) === "jimmyt") {
      msg = "Hey you are JimmyT you belong here!";
    } else if (user.trim().toLowerCase().substr(0,5) === "sonyl" || user.trim().toLowerCase().substr(1,5) === "sonyl") {
      msg = "Hi Sonyl can I sing you a song?";
    }
    res.send(msg);
  });

  johnny5.hear(/badger/i, function(res) {
    res.send("Badgers? BADGERS? PUGS HATE STINKIN BADGERS");
  });

  johnny5.respond(/open the pod bay doors/i, function(res) {
    var returnMsg = "I hear you want '" + res.match[0] + "'...  I'm afraid I can't let you do that for you.";
    //console.log(returnMsg);
    res.reply(returnMsg);
  });

  johnny5.respond(/I am feeling(.*)/i, function(res) {
    var emotion = determineEmotionFromMatch(res.match[1]);

    var returnMsg = "I hear you loud and clear... you are feeling " + emotion +
      ".\n\n No matter how you feel I think this will bring a smile to your face.\n\n" + getPugImageLinkForEmotion(emotion);

    //console.log(returnMsg);
    res.reply(returnMsg);
  });

  johnny5.hear(/Listen I am feeling(.*)/i, function(res) {
    var emotion = determineEmotionFromMatch(res.match[1]);

    var returnMsg = "I AM LISTENING!!!  I hear you loud and clear... you are feeling " + emotion +
      ".\n\n No matter how you feel I think this will bring a smile to your face.\n\n" + getPugImageLinkForEmotion(emotion);

    //console.log(returnMsg);
    res.send(returnMsg);
  });

  function determineEmotionFromMatch(match) {
    if (match && match.trim().length == 0) {
      match = "nothing";
    } else if (match) {
      match = match.trim();
    }
    return match;
  }

  function getPugImageLinkForEmotion(emotion) {
    var returnVal = "";
    switch (emotion.trim().toLowerCase()) {
      case "fat":
        returnVal = pugs[0];
        break;
      case "frustrated":
        returnVal = pugs[1];
        break;
      case "happy":
        returnVal = pugs[2];
        break;
      case "confused":
        returnVal = pugs[3];
        break;
      case "angry":
        returnVal = pugs[4];
        break;
      case "cool":
        returnVal = pugs[5];
        break;
      case "brave":
        returnVal = pugs[6];
        break;
      case "scared":
        returnVal = pugs[7];
        break;
      case "disgusted":
        returnVal = pugs[8];
        break;
      case "surprised":
        returnVal = pugs[9];
        break;
      case "defiant":
        returnVal = pugs[10];
        break;
      default:
        returnVal = pugs[chooseRandomPosition(pugs)];
    }
    //console.log("Emotional pug link is: " + returnVal);
    return returnVal;
  }



  function formatNewMemberOutput(members) {
    if (members.length() > 1) {
      return "Welcome " + formatNames(buildNamesArrayFromString(members)) + ".  Have a glorious day!!!";
    } else {
      return "Welcome " + members[0] + ".  Have a glorious day!!!";
    }
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
