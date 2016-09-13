const HttpError = require('some-http-error');
const crypto = require('crypto');
const utils = {};

utils.isObjectId = (id) =>
  typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);

utils.escape = (text) => {
  return text.replace(/[<>'"&\t\r\n]/g, char => {
    switch (char) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '\'': return '&#39;';
      case '"': return '&quot;';
      case '&': return '&amp;';
      case '\t': return '&nbsp;'.repeat(4);
      case '\r': return '';
      case '\n': return '<br>';
    }
  }).replace(/  +/g, str => {
    return '&nbsp;'.repeat(str.length);
  })
};

utils.isValidName = (name) =>
  /^[\u4e00-\u9fa5\w][- \u4e00-\u9fa5\w]{0,15}[\u4e00-\u9fa5\w]$/.test(name);

utils.isValidEmail = (email) =>
  /^\w[-\w\.]*@\w[-\w\.]*\.[a-zA-Z]+$/.test(email);

utils.isValidUrl = (url) =>
  /^(?:https?:\/\/)?\w[-\w\.]*\.[a-zA-Z]+$/.test(url);


utils.verifyUserForm = (form) => {
  if (!utils.isValidName(form.user)) {
    throw new HttpError.BadRequestError('Name error');
  }
  if (!utils.isValidEmail(form.email)) {
    throw new HttpError.BadRequestError('Email error');
  }
  if (form.url && !utils.isValidUrl(form.url)) {
    throw new HttpError.BadRequestError('Url error');
  }
  return true;
};

utils.md5 = (string) =>
  crypto.createHash('md5').update(string).digest('hex');

utils.toNormalUrl = (url) => {
  if (!/^https?:\/\//.test(url)) {
    return 'http://' + url;
  }
  return url;
};

module.exports = utils;