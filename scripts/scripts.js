module.exports = function(johnny5) {

//  johnny5.hear1(/Hello!/, function(res) {
//    return res.send("Hi Johnny5 is there!");
//  });

  johnny5.hear(/please/, function(res) {
    var names = res.match[0] + res.match[1];//.substring(14, 1000);
    return res.send("Welcome " + names + ". Have a glorious day");
  });
}
