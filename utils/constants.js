const validator = require('validator');

const isUrl = (link) => {
  const result = validator.isURL(link);
  if (result) {
    return link;
  }
  throw new Error('Невалидная ссылка');
};

module.exports = isUrl;

// от Макса
// const regExpUrl = /^https?:\/\/(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$/;

// от Юры
// const regExpUrl2 = /(https?:\/\/)(w{3}.)?(([a-zA-Z0-9]+).)+/;
