import React from 'react';
import { Link } from 'react-router';

const BlogPage = () => {
  return (
    <div>
      <h1>Blog List!</h1>
      <Link to="/tags">tags</Link>
    </div>
  )
};
export default BlogPage;
