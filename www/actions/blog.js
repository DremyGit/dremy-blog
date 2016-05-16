export const fetchBlogList = () => {
  return {
    type: 'FETCH_BLOG_LIST'
  }
};

export const fetchBlogListSuccess = () => {
  return {
    type: 'FETCH_BLOG_LIST_SUCCESS'
  }
};

export const fetchBlogListFail = () => {
  return {
    type: 'FETCH_BLOG_LIST_FAIL'
  }
};
