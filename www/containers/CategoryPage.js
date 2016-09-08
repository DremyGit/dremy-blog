import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import ListBlock from '../components/ListBlock/ListBlock';
import { connect } from 'react-redux';
import { fetchBlogListIfNeed } from '../actions/blog';
import { fetchCategoryListIfNeed } from '../actions/category';
import { dispatchFetch } from '../helpers/fetchUtils';

@connect(state => ({
  blogEntities: state.getIn(['blog', 'entities']),
  categoryEntities: state.getIn(['category', 'entities'])
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
    const { blogEntities, categoryEntities } = this.props;
    const sortedCategoryEntities = categoryEntities.sort((a, b) => a.get('count') < b.get('count'));
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
            <ListBlock key={category.get('code')} blogs={this.props.blogEntities.toList().filter(blog => blog.get('category') === category.get('code')).reverse()} title={category.get('name')} />
          )
        }
      </div>
    )
  }
}
