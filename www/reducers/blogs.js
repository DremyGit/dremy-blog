const blogs = (state = {}, action = {}) => {
  switch (action.type) {
    case 'FETCH_BLOG_LIST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_BLOG_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case 'FETCH_BLOG_LIST_FAIL':
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
  }
};
export default blogs