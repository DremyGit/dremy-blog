import React from 'react';
import ArticleBody from '../components/Article/ArticleBody';
import ArticleHead from '../components/Article/ArticleHead';
import { connect } from 'react-redux';
import { fetchBlogIfNeed, fetchBlogListIfNeed } from '../actions/blog'
import 'isomorphic-fetch';

@connect(state => ({
  blogs: state.get('blogs'),
  categories: state.get('categories'),
  status: state.get('status')
}))
export default class Blog extends React.Component {

  componentWillMount() {
    const { dispatch, blogs, params } = this.props;
    const blogId = params.blogName;
    const blog = blogs.getIn(['data', blogId]);
    dispatch(fetchBlogIfNeed(blogId));
  }

  render() {
    const { blogs, categories, params, status } = this.props;
    const blogId = params.blogName;
    const blog = blogs.get(blogId);
    if (status.get('fetching') || !blog) {
      return <div>Loading</div>;
    }
    const category = categories.get(blog.get('category'));
    return (
      <div>
        <ArticleHead blog={blog} category={category} center={true} />
        <ArticleBody html={blog.getIn(['html', 'body'])} />
      </div>
    )
  }
}
