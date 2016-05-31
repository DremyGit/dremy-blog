import React from 'react';
import { Link } from 'react-router';
import BlogItem from '../components/BlogItem/BlogItem';
import { connect } from 'react-redux';
import {
  fetchBlogListIfNeed
} from '../actions/blog';
import fetch from 'isomorphic-fetch';

//const blogs = [{"_id":"57301d8789d0867808ed502a","category":{"_id":"57301d3189d0867808ed5028","name":"分类1","code":"cate-1","update_at":"2016-05-09T05:16:33.767Z","create_at":"2016-05-09T05:16:33.767Z"},"title":"分类1","code":"blog-1","comments":[],"click_count":0,"comment_count":9,"toc":[{"level":1,"text":"blog1","id":"blog1","children":[]}],"html":{"body":"<h2 id=\"blog1\">blog1</h2>","summary":"<h2 id=\"blog1\">blog1</h2>"},"markdown":{"body":"# blog1","summary":"<h2 id=\"blog1\">blog1</h2>"},"update_at":"2016-05-09T05:17:59.959Z","create_at":"2016-05-09T05:17:59.959Z","tags":[{"_id":"573027c7907b850c0e333979","name":"标签1","code":"tag-1","update_at":"2016-05-09T06:01:43.483Z","create_at":"2016-05-09T06:01:43.483Z"},{"_id":"573027d2907b850c0e33397a","name":"标签2","code":"tag-2","update_at":"2016-05-09T06:01:54.963Z","create_at":"2016-05-09T06:01:54.963Z"}]},{"_id":"57301dab89d0867808ed502b","category":{"_id":"57301d3c89d0867808ed5029","name":"分类2","code":"cate-2","update_at":"2016-05-09T05:16:44.961Z","create_at":"2016-05-09T05:16:44.961Z"},"title":"分类2博客","code":"blog-2","comments":[],"click_count":0,"comment_count":0,"toc":[{"level":1,"text":"blog2","id":"blog2","children":[]}],"html":{"body":"<h2 id=\"blog2\">blog2</h2>","summary":"<h2 id=\"blog2\">blog2</h2>"},"markdown":{"body":"# blog2","summary":"# blog2"},"update_at":"2016-05-09T05:18:35.251Z","create_at":"2016-05-09T05:18:35.251Z","tags":[{"_id":"573027d2907b850c0e33397a","name":"标签2","code":"tag-2","update_at":"2016-05-09T06:01:54.963Z","create_at":"2016-05-09T06:01:54.963Z"}]},{"_id":"57301dc589d0867808ed502c","category":{"_id":"57301d3189d0867808ed5028","name":"分类1","code":"cate-1","update_at":"2016-05-09T05:16:33.767Z","create_at":"2016-05-09T05:16:33.767Z"},"title":"博客3","code":"blog-3","comments":[],"click_count":0,"comment_count":0,"toc":[{"level":1,"text":"blog3","id":"blog3","children":[]}],"html":{"body":"<h2 id=\"blog3\">blog3</h2>","summary":"<h2 id=\"blog3\">blog3</h2>"},"markdown":{"body":"# blog3","summary":"# blog3"},"update_at":"2016-06-09T05:19:01.770Z","create_at":"2016-06-09T05:19:01.770Z","tags":[]}];
@connect(state => state)
class BlogPage extends React.Component {
  componentDidMount() {
    console.log('did mount');
    const { dispatch }  = this.props;
    dispatch(fetchBlogListIfNeed());
  }
  render() {
    const { blogs, tags, categories, status } = this.props;
    if (status.get('fetching')) {
      return <div>Loading</div>;
    }
    if (!status.get('fetched')) {
      return <div>Error</div>;
    }
    const blogList = blogs.keySeq();
    return (
      <div>
        {blogList.map(blogId =>
          <BlogItem
            key={blogId}
            blog={blogs.get(blogId)}
            category={categories.get(blogs.getIn([blogId, 'category']))} />
        )}
      </div>
    );
  }
}
export default BlogPage;
