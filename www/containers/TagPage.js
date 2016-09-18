import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import TagPanel from '../components/TagPanel/TagPanel';
import Loading from '../components/Loading/Loading';
import { fetchTagListIfNeed } from '../actions/tag';
import { dispatchFetch } from '../helpers/fetchUtils';
import styles from '../components/TagPanel/TagPanel.scss';


@connect(state => ({
  tagEntities: state.getIn(['tag', 'entities']),
  isTagListFetched: state.getIn(['tag', 'isFetched'])
}))
export default class TagPage extends React.Component {
  static fetches = [
    fetchTagListIfNeed
  ];

  componentDidMount() {
    dispatchFetch(TagPage.fetches, this.props);
  }
  render () {
    const { tagEntities, isTagListFetched } = this.props;
    if (!isTagListFetched) {
      return <Loading />
    }
    return (
      <div>
        <Helmet
          title='博客标签 Dremy_博客'
          meta={[
            { "name": "description", "content": "Dremy_博客 博客标签" }
          ]}
        />
        <div className={styles.title}>共有 {tagEntities.size} 个标签：</div>
        <TagPanel tags={tagEntities.sort((a, b) => a.get('create_at') > b.get('create_at')).valueSeq()} />
      </div>
    )
  }
};
export default TagPage;
