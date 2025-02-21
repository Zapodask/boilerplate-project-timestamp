// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  let inputDate = req.params.date

  if (!inputDate) {
    const today = new Date()

    res.json({
      unix: today.getTime(),
      utc: today.toUTCString()
    })

    return
  }

  if (!isNaN(Number(inputDate))) {
    inputDate = Number(inputDate)
  }

  const d = new Date(inputDate);

  if (!isNaN(d.getTime())) {
    res.json({
      unix: d.getTime(),
      utc: d.toUTCString()
    })
  } else {
    res.json({
      error: 'Invalid Date'
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
