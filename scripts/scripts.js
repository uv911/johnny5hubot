module.exports = function(johnny5) {

//  johnny5.hear1(/Hello!/, function(res) {
//    return res.send("Hi Johnny5 is there!");
//  });

  johnny5.hear(/.+/, function(res) {
    var msg = res.match[0];
    console.log("0: " + res.match[0] + " 1 " + res.match[1]);

    return res.send(processMessage(msg));
  });

  function processMessage(msg) {
    console.log("Called processMessage with message " + msg);

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

    return "Welcome " + formatNames(buildNamesArrayFromString(names)) + ".  Have a glorious day";
  }

  function buildNamesArrayFromString(str) {
    var names = str.match(/@[a-zA-Z]*/g);

    return names;
  }



  function formatNames(namesArray) {
    return "<" + namesArray.join("> and <") + ">";
  }
}
