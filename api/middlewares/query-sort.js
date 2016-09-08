const querySort = (req, res, next) => {
  if (req.query.sort) {
    const sortObj = {};
    const sortParams = req.query.sort.split(',');
    sortParams.forEach(sortParam => {
      const field = sortParam.match(/\w+/)[0];
      const order = sortParam[0] === '-' ? -1 : 1;
      sortObj[field] = order;
    });
    req.sortObj = sortObj;
  }
  next();
};
module.exports = querySort;