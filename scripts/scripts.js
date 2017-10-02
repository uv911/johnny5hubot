module.exports = function(johnny5) {
  johnny5.hear(/Hello!/, function(res) {
    return res.send("Hi Johnny5 is there!");
  });
}
