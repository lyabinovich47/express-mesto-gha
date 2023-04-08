const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', { // возможно вместо localhost нужно использовать 127.0.0.1 или 0.0.0.0
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '642d902c742adae36205dc19',
  };

  next();
});
app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
