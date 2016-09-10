import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import BlogItem from '../components/BlogItem/BlogItem';
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
  blogList: state.getIn(['blog', 'list']),
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
    const { blogEntities, blogList, isBlogListFetched, categoryEntities, tagEntities, params, location } = this.props;
    if (!isBlogListFetched) {
      return <div>Loading</div>
    }
    const pageType = location.pathname.split('/')[1];

    let filtedBlogs;
    let title;
    if (pageType === 'category') {
      filtedBlogs = blogEntities.filter(blog => blog.get('category') === params.categoryName).valueSeq();
      title = categoryEntities.getIn([params.categoryName, 'name']);
    } else if (pageType === 'tag') {
      filtedBlogs = blogEntities.filter(blog => blog.get('tags').includes(params.tagName)).valueSeq();
      title = tagEntities.getIn([params.tagName, 'name']);
    } else if (pageType === 'archive') {
      filtedBlogs = blogEntities.filter(blog => new Date(blog.get('create_at')).getFullYear() === +params.year).valueSeq();
      title = +params.year;
    } else {
      filtedBlogs = blogEntities.valueSeq();
      title = '全部文章';
    }

    const page = +params.pageNum || 1;
    // Need Config
    const size = config.blogItemPerPage;
    const showBlogs = filtedBlogs
                        .skip((page - 1) * size)
                        .take(size);
    return (
      <div>
        <Helmet
          title={`${title} Dremy_博客`}
          meta={[
            { "name": "description", "content": "Dremy_博客 博客列表" }
          ]}
        />
        <BlogListTitle title={title} count={filtedBlogs.size} />
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
