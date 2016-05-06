'use strict';

const toc = (markdown) => {
  const re = /^(#{1,5})\s+?(.*)/gm;
  const _toc = [];
  let match;
  let level1;
  let level2;
  while ((match = re.exec(markdown)) != null ) {
    const level = match[1].length;
    const text = match[2];
    const _tree = {
      level: level,
      text: text,
      children: []
    };

    if (level == 1) {
      _toc.push(_tree);
      level1 = _tree;
      level2 = null;
    } else if (level == 2) {
      if (!level1) {
        throw new Error("Markdown toc handle error")
      }
      level1.children.push(_tree);
      level2 = _tree;
    } else if (level == 3) {
      if (!level2) {
        throw new Error("Markdown toc handle error")
      }
      level2.children.push(_tree);
    }
  }

  return _toc;
};

module.exports = toc;