import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchBlogIfNeed } from '../actions/blog';
import { fetchCommentsIfNeed } from '../actions/comment';
import { dispatchFetch } from '../helpers/fetchUtils';
import Article from '../components/Article/Article';
import Loading from '../components/Loading/Loading';
import CommentArea from '../components/Comment/CommentArea';

@connect(state => ({
  blogEntities: state.getIn(['blog', 'entities']),
  categoryEntities: state.getIn(['category', 'entities']),
  tagEntities: state.getIn(['tag', 'entities']),
  commentEntities: state.getIn(['comment', 'entities']),
  blogComments: state.getIn(['comment', 'blog']),
}))
export default class Blog extends React.Component {

  static fetches = [
    fetchBlogIfNeed,
  ];

  componentDidMount() {
    dispatchFetch(Blog.fetches, this.props);
    const { dispatch, params } = this.props;
    dispatch(fetchCommentsIfNeed(params));
  }

  render() {
    const {
      blogEntities, categoryEntities, tagEntities,
      commentEntities, params, blogComments,
    } = this.props;
    const blogId = params.blogName;
    const isBlogFetched = blogEntities.getIn([blogId, 'html', 'body']);
    if (!isBlogFetched) {
      return <Loading />;
    }
    const blog = blogEntities.get(blogId);
    const category = categoryEntities.get(blog.get('category'));
    const description = blog.getIn(['html', 'summary'])
                            .replace(/<.*?>|\r?\n/g, ' ')
                            .replace(/ {2,}/g, ' ')
                            .substr(0, 100);
    return (
      <div>
        <Helmet
          title={`${blog.get('title')} Dremy_博客`}
          meta={[
            { name: 'description', content: description },
          ]}
        />
        <Article blog={blog} category={category} tags={blog.get('tags').map(tag => tagEntities.get(tag))} />
        <CommentArea
          blog={blog}
          commentEntities={commentEntities}
          comments={blogComments && blogComments.get(blogId)}
          dispatch={this.props.dispatch}
        />
      </div>
    );
  }
}
