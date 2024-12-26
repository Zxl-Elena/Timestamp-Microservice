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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const timestamp = req.params.date;

  let date;

  if (!timestamp) {
    // 如果没有提供日期参数，使用当前时间
    date = new Date();
  } else if (!isNaN(timestamp)) {
    // 如果是纯数字，将其转换为毫秒时间戳
    date = new Date(parseInt(timestamp));
  } else {
    // 如果是日期字符串，直接解析
    date = new Date(timestamp);
  }

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // 构造结果
  const result = {
    unix: date.getTime(),
    utc: date.toUTCString()
  };

  res.json(result);
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});