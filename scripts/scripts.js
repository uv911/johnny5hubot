module.exports = function(johnny5) {

//  johnny5.hear1(/Hello!/, function(res) {
//    return res.send("Hi Johnny5 is there!");
//  });

  johnny5.hear(/.+/, function(res) {
    var names = res.match[0].substring(14, 1000);
    console.log("0: " + res.match[0] + " 1 " + res.match[1]);
    return res.send("Welcome " + names + ". Have a glorious day");
  });
}
