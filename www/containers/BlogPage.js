import React from 'react';
import Article from '../components/Article/Article';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchBlogIfNeed } from '../actions/blog'
import { dispatchFetch } from '../helpers/fetchUtils'
import Loading from '../components/Loading/Loading';
import CommentArea from '../components/Comment/CommentArea';

@connect(state => ({
  blogEntities: state.getIn(['blog', 'entities']),
  categoryEntities: state.getIn(['category', 'entities']),
  tagEntities: state.getIn(['tag', 'entities'])
}))
export default class Blog extends React.Component {

  static fetches = [
    fetchBlogIfNeed
  ];

  componentWillMount() {
    dispatchFetch(Blog.fetches, this.props)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.blogEntities !== this.props.blogEntities
        || nextProps.categoryEntities !== this.props.categoryEntities
        || nextProps.tagEntities !== this.props.tagEntities
        || nextProps.params.blogName !== this.props.params.blogName;
  }

  render() {
    const { blogEntities, categoryEntities, tagEntities, params } = this.props;
    const blogId = params.blogName;
    const isBlogFetched = blogEntities.getIn([blogId, 'html', 'body']);
    if (!isBlogFetched) {
      return <Loading />
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
        <Article blog={blog} category={category} tags={blog.get('tags').map(tag => tagEntities.get(tag))} />
        <CommentArea blog={blog} dispatch={this.props.dispatch} />
      </div>
    )
  }
}
