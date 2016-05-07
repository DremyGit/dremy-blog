'use strict';

const toc = (markdown) => {
  const re = /^(#{1,5})\s+?(.*)/gm;
  const _toc = [];
  let arr = [];
  let match;
  let lastLevel = 0;
  while ((match = re.exec(markdown)) != null ) {
    const level = match[1].length;
    const text = match[2];
    const _tree = {
      level: level,
      text: text,
      id: text.toLowerCase().replace(/[^\u4e00-\u9fa50-9a-z]+/g, '-'),
      children: []
    };
    if (level > lastLevel + 1) {
      return [];
    }
    if (level == 1) {
      _toc.push(_tree);
    } else {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].level == level - 1) {
          arr[i].children.push(_tree);
          break;
        }
      }
    }
    arr.push(_tree);
    lastLevel = level;
  }
  return _toc;
};

module.exports = toc;