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

// const regExpUrl2 = /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?#?$/;

// const reUrl3 = /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/;

// /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?#?$/;

// module.exports = regExpUrl;
// от Юры
// const regExpUrl2 = /(https?:\/\/)(w{3}.)?(([a-zA-Z0-9]+).)+/;
