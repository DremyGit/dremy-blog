import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import ListBlock from '../components/ListBlock/ListBlock';
import Loading from '../components/Loading/Loading';

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
    if (!isBlogListFetched) {
      return <Loading />
    }
    const groupedBlogs = blogEntities.groupBy(blog => blog.get('create_at').substr(0, 4)).sort((a, b) => {
      if (a.size < b.size) return 1;
      if (a.size > b.size) return -1;
      return 0;
    });
    return (
      <div>
        <Helmet
          title='博客归档 Dremy_博客'
          meta={[
            { "name": "description", "content": "Dremy_博客 博客归档" }
          ]}
        />
        {groupedBlogs.entrySeq().map(([year, blogs]) =>
            <ListBlock
              key={year}
              link={`/archive/${year}`}
              blogs={blogs.toList()}
              title={'' + year}
            />
        ).toArray()}
      </div>
    )
  }
};
export default ArchivePage;
