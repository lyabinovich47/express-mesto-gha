const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', { // возможно вместо localhost нужно использовать 127.0.0.1 или 0.0.0.0
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
