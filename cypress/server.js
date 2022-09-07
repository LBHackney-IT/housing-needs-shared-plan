const express = require('express')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.send('Fake SMS Server is running')
})

app.post('/messages', function (req, res) {
  console.log(req.body)
  if (req.body.name === 'John Cena') {
    console.log('calling 500')
    res.statusCode = 500;

    res.sendStatus(500);
  } else {
    res.sendStatus(200);

  }
})

app.listen(8080)
