module.exports = function(johnny5) {

//  johnny5.hear1(/Hello!/, function(res) {
//    return res.send("Hi Johnny5 is there!");
//  });

  johnny5.hear(/.+/, function(res) {
    var msg = res.match[0];
    console.log("0: " + res.match[0] + " 1 " + res.match[1]);

    var findStr = "please welcome";
    var start = msg.toLowerCase().lastIndexOf(findStr) + findStr.length + 1;
    var names = msg.substring(start, 1000);

    return res.send("Welcome " + names + ".  Have a glorious day");
  });
}
