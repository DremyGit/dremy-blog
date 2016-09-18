import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import ListBlock from '../components/ListBlock/ListBlock';
import { connect } from 'react-redux';
import { fetchBlogListIfNeed } from '../actions/blog';
import { fetchCategoryListIfNeed } from '../actions/category';
import { dispatchFetch } from '../helpers/fetchUtils';
import Loading from '../components/Loading/Loading';

@connect(state => ({
  blogEntities: state.getIn(['blog', 'entities']),
  categoryEntities: state.getIn(['category', 'entities']),
  isBlogListFetched: state.getIn(['blog', 'isFetched']),
  isCategoryListFetched: state.getIn(['category', 'isFetched'])
}))
export default class CategoryPage extends React.Component {

  static fetches = [
    fetchBlogListIfNeed,
    fetchCategoryListIfNeed
  ];

  componentDidMount() {
    dispatchFetch(CategoryPage.fetches, this.props);
  }

  render() {
    const { blogEntities, categoryEntities, isBlogListFetched, isCategoryListFetched } = this.props;

    if (!isBlogListFetched || !isCategoryListFetched) {
      return <Loading />
    }

    const sortedCategoryEntities = categoryEntities.sort((a, b) => {
      if (a.get('count') < b.get('count')) return 1;
      if (a.get('count') > b.get('count')) return -1;
      return 0;
    });
    return (
      <div>
        <Helmet
          title='博客分类 Dremy_博客'
          meta={[
            { "name": "description", "content": "Dremy_博客 博客分类" }
          ]}
        />
        {
          sortedCategoryEntities.valueSeq().map(category =>
            <ListBlock
              key={category.get('code')}
              link={`/category/${category.get('code')}`}
              blogs={blogEntities.toList().filter(blog => blog.get('category') === category.get('code'))}
              title={category.get('name')}
            />
          ).toArray()
        }
      </div>
    )
  }
}
