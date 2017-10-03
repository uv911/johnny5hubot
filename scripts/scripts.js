module.exports = function(johnny5) {

  johnny5.hear1(/Hello!/, function(res) {
    return res.send("Hi Johnny5 is there!");
  });

  johnny5.hear(/please welcome/, function(res) {
    var after = res.match[0].substring(14, 1000);
    return res.send("Welcome " + after + ". Have a glorious day");
  });
}
