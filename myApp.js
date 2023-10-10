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
  if (process.env["MESSAGE_STYLE"] === 'uppercase') {
    res.json({ "message": message.toUpperCase() });
  }
  else {
    res.json({ "message": message });
  }
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
},
  function(req, res) {
    res.json({ 'time': req.time });
  });

app.get('/:word/echo', function(req, res) {
  res.json({ 'echo': req.params.word })
});

app.route('/name').get(function(req, res) {
  res.json({ 'name': req.query.first + ' ' + req.query.last })
}).post(function(req, res) {
  res.json({ 'name': req.query.first + ' ' + req.query.last })
});


































module.exports = app;
