import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import BlogItem from '../components/BlogItem/BlogItem';
import Pager from '../components/Pager/Pager';
import { connect } from 'react-redux';
import config from '../config';
import {
  fetchBlogListIfNeed
} from '../actions/blog';
import { dispatchFetch } from '../helpers/fetchUtils'

@connect(state => ({
  blogEntities: state.getIn(['blog', 'entities']),
  blogList: state.getIn(['blog', 'list']),
  isBlogListFetched: state.getIn(['blog', 'isFetched']),
  categoryEntities: state.getIn(['category', 'entities']),
}))
class BlogPage extends React.Component {

  static fetches = [
    fetchBlogListIfNeed
  ];

  componentDidMount() {
    dispatchFetch(BlogPage.fetches, this.props);
  }

  render() {
    const { blogEntities, blogList, isBlogListFetched, categoryEntities, params } = this.props;
    if (!isBlogListFetched) {
      return <div>Loading</div>
    }
    const page = +params.pageNum || 1;
    // Need Config
    const size = config.blogItemPerPage;
    const showBlogs = blogList
                      .toSeq()
                      .skip((page - 1) * size)
                      .take(size);
    return (
      <div>
        <Helmet
          title='博客列表 Dremy_博客'
          meta={[
            { "name": "description", "content": "Dremy_博客 博客列表" }
          ]}
        />
        <div>
          {showBlogs.map(blogId =>
            <BlogItem
              key={blogId}
              blog={blogEntities.get(blogId)}
              category={categoryEntities.get(blogEntities.getIn([blogId, 'category']))} />
          )}
        </div>
        <Pager totalNum={blogList.size} currentPage={page} perPage={config.blogItemPerPage} showPage={config.showPageNum} baseUrl="/blog/p" />
      </div>
    );
  }
}
export default BlogPage;
