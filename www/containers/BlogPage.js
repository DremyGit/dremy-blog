import React from 'react';
import ArticleBody from '../components/Article/ArticleBody';
import ArticleHead from '../components/Article/ArticleHead';
import { connect } from 'react-redux';
import { fetchBlogListIfNeed } from '../actions/blog'
import 'isomorphic-fetch';

@connect(state => state)
export default class Blog extends React.Component {

  static fetchData() {
  }
  componentWillMount() {
    const { dispatch, blogs, params } = this.props;
    const blogId = params.blogName;
    const blog = blogs.getIn(['data', blogId]);
    if (!blog) {
      dispatch(fetchBlogListIfNeed());
    }
  }

  render() {
    const { blogs, categories, params, status } = this.props;
    if (status.get('fetching')) {
      return <div>Loading</div>;
    }
    if (!status.get('fetched')) {
      return <div>Error</div>;
    }
    const blogId = params.blogName;
    const blog = blogs.get(blogId);
    const category = categories.get(blog.get('category'));
    console.log(category);
    return (
      <div>
        <ArticleHead blog={blog} category={category} center={true} />
        <ArticleBody html={blog.getIn(['html', 'body'])} />
      </div>
    )
  }
}
