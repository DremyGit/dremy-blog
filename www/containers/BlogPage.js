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
    const { blogs, categories, params } = this.props;
    if (!blogs || !blogs.get('loaded')) {
      return <h1>加载中</h1>
    }
    const blogId = params.blogName;
    const blog = blogs.getIn(['data', blogId]);
    const category = categories.data[blog.get('category')];
    return (
      <div>
        <ArticleHead blog={blog} category={category} center={true} />
        <ArticleBody html={blog.getIn(['html', 'body'])} />
      </div>
    )
  }
}
