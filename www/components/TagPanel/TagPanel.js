import React from 'react';
import { Link } from 'react-router';
import styles from './TagPanel.scss';
import TagItem from './TagItem';

export default class TagPanel extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.tags != this.tags;
  }

  calculateFontSize(tags, minSize, maxSize) {
    var max = tags.max((a, b) => a.get('count') > b.get('count')).get('count');
    var min = tags.min((a, b) => a.get('count') < b.get('count')).get('count');
    console.log(max, min);
    return tags.map(tag => tag.set('fontSize', minSize + Math.log(tag.get('count') + 1) / Math.log(max + 1) * (maxSize - minSize)));
  }

  render() {
    const { tags } = this.props;
    const ntags = this.calculateFontSize(tags, 12, 30);
    return (
      <div className={styles.container}>
        {ntags.map(tag =>
          <TagItem key={tag.get('code')} name={tag.get('name')} link={`l/tag/${tag.get('code')}`} fontSize={tag.get('fontSize')} />
        )}
      </div>
    )
  }
}

TagPanel.PropTypes = {
  tags: React.PropTypes.object.isRequired
};