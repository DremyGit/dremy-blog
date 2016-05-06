'use strict';
const marked = require('marked');

const renderer = new marked.Renderer();

renderer.heading = (text, level) => {
  const escape = text.toLowerCase().replace(/[^\u4e00-\u9fa50-9a-z]+/g, '-');
  return `<h${level + 1} id="${escape}">${text}</h${level + 1}>`;
};

marked.setOptions({
  renderer: renderer
});

module.exports = marked;