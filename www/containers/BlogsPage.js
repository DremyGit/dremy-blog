import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import BlogItem from '../components/BlogPanel/BlogItem';
import BlogListTitle from '../components/BlogPanel/BlogListTitle';
import Pager from '../components/Pager/Pager';
import { connect } from 'react-redux';
import config from '../config';
import {
  fetchBlogListIfNeed
} from '../actions/blog';
import { dispatchFetch } from '../helpers/fetchUtils'

@connect(state => ({
  blogEntities: state.getIn(['blog', 'entities']),
  isBlogListFetched: state.getIn(['blog', 'isFetched']),
  categoryEntities: state.getIn(['category', 'entities']),
  tagEntities: state.getIn(['tag', 'entities'])
}))
class BlogPage extends React.Component {

  static fetches = [
    fetchBlogListIfNeed
  ];

  componentDidMount() {
    dispatchFetch(BlogPage.fetches, this.props);
  }

  render() {
    const { blogEntities, isBlogListFetched, categoryEntities, tagEntities, params, location } = this.props;
    if (!isBlogListFetched) {
      return <div>Loading</div>
    }

    const pageType = location.pathname.split('/')[1];
    let filtedBlogs;
    let title;

    if (pageType === 'category') {
      filtedBlogs = blogEntities.filter(blog => blog.get('category') === params.categoryName).valueSeq();
      title = '分类：' + categoryEntities.getIn([params.categoryName, 'name']);
    } else if (pageType === 'tag') {
      filtedBlogs = blogEntities.filter(blog => blog.get('tags').includes(params.tagName)).valueSeq();
      title = '标签：' + tagEntities.getIn([params.tagName, 'name']);
    } else if (pageType === 'archive') {
      filtedBlogs = blogEntities.filter(blog => new Date(blog.get('create_at')).getFullYear() === +params.year).valueSeq();
      title = +params.year + ' 年';
    } else {
      filtedBlogs = blogEntities.valueSeq();
    }

    const page = +params.pageNum || 1;
    const size = config.blogItemPerPage;
    const showBlogs = filtedBlogs
                        .skip((page - 1) * size)
                        .take(size);
    return (
      <div>
        <Helmet
          title={`${title || '首页'} Dremy_博客`}
          meta={[
            { "name": "description", "content": "Dremy_博客 博客列表" }
          ]}
        />
        { title && <BlogListTitle title={title} count={filtedBlogs.size} /> }
        <div>
          {showBlogs.map(blog =>
            <BlogItem
              key={blog.get('code')}
              blog={blog}
              category={categoryEntities.get(blog.get('category'))}
              tags={blog.get('tags').map(tag => tagEntities.get(tag))} />
          )}
        </div>
        <Pager totalNum={filtedBlogs.size} currentPage={page} perPage={config.blogItemPerPage} showPage={config.showPageNum} baseUrl="/blog/p" />
      </div>
    );
  }
}
export default BlogPage;
