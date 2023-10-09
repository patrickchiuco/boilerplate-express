let express = require('express');
let app = express();
console.log("Hello World!")
//console.log(__dirname + "/views/index.html")
app.use(function(req, res, next) {
  let message = req.method + " " + req.path + " - " + req.ip;
  console.log(message);
  next();
});
app.use("/public", express.static(__dirname + "/public"))
app.get("/", function(req, res) {
  //res.send("Hello Express")

  res.sendFile(__dirname + "/views/index.html")
});


app.get("/json", function(req, res) {
  let message = "Hello json";
  console.log(process.env["MESSAGE_STYLE"])
  if (process.env["MESSAGE_STYLE"] === 'uppercase') {
    res.json({ "message": message.toUpperCase() });
  }
  else {
    res.json({ "message": message });
  }
});

module.exports = app;
