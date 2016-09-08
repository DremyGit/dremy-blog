import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import ListBlock from '../components/ListBlock/ListBlock';

import { connect } from 'react-redux';
import { fetchBlogListIfNeed } from '../actions/blog';
import { dispatchFetch } from '../helpers/fetchUtils';

@connect(state => ({
  blogEntities: state.getIn(['blog', 'entities']),
  isBlogListFetched: state.getIn(['blog', 'isFetched']),
}))
export default class ArchivePage extends React.Component {

  static fetches = [
    fetchBlogListIfNeed
  ];

  componentDidMount() {
    dispatchFetch(ArchivePage.fetches, this.props);
  }

  render() {
    const { blogEntities, isBlogListFetched } = this.props;
    const groupedBlogs = blogEntities.groupBy(blog => blog.get('create_at').substr(0, 4));
    if (!isBlogListFetched) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <Helmet
          title='博客归档 Dremy_博客'
          meta={[
            { "name": "description", "content": "Dremy_博客 博客归档" }
          ]}
        />
        {groupedBlogs.entrySeq().map(([year, blogs]) =>
            <ListBlock key={year} blogs={blogs.toList()} title={'' + year} />
        )}
      </div>
    )
  }
};
export default ArchivePage;
