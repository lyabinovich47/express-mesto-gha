const express = require('express');
// const path = require('path'); т.к. убрали строку из-за static ниже
// const bodyParser = require('body-parser');  убираем, заменяем на express.json()
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT, MONGO_URL } = require('./config');

mongoose.connect(MONGO_URL, {});

const app = express();

// app.use(express.static(path.join(__dirname, 'public'))); убираем по ревью, т.к. нет папки static
app.use(express.json());

app.use('/', router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
