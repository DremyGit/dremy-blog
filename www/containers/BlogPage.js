import React from 'react';
import Article from '../components/Article/Article';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchBlogIfNeed } from '../actions/blog'
import { dispatchFetch } from '../helpers/fetchUtils'

@connect(state => ({
  blogEntities: state.getIn(['blog', 'entities']),
  categoryEntities: state.getIn(['category', 'entities']),
}))
export default class Blog extends React.Component {

  static fetches = [
    fetchBlogIfNeed
  ];

  componentWillMount() {
    dispatchFetch(Blog.fetches, this.props)
  }

  render() {
    const { blogEntities, categoryEntities, params } = this.props;
    const blogId = params.blogName;
    const isBlogFetched = blogEntities.getIn([blogId, 'html', 'body']);
    if (!isBlogFetched) {
      return <div>Loading</div>;
    }
    const blog = blogEntities.get(blogId);
    const category = categoryEntities.get(blog.get('category'));
    const description = blog.getIn(['html', 'summary'])
                            .replace(/<.*?>|\r?\n/g, ' ')
                            .replace(/  +/g, ' ')
                            .substr(0, 100);
    return (
      <div>
        <Helmet
          title={blog.get('title') + ' Dremy_博客'}
          meta={[
            { "name": "description", "content": description }
          ]}
        />
        <Article blog={blog} category={category} />
      </div>
    )
  }
}
