import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './TopicCard.scss';

const dataSource = [
  {
    meta: '话题曝光',
    total: '56799',
    up: '100',
    down: '100',
    icon: '//img.alicdn.com/tfs/TB1nQ4hgILJ8KJjy0FnXXcFDpXa-132-126.png',
  },
  {
    meta: '话题曝光',
    total: '56799',
    up: '100',
    down: '100',
    icon: '//img.alicdn.com/tfs/TB1OuuTgL6H8KJjy0FjXXaXepXa-132-126.png',
  },
  {
    meta: '话题曝光',
    total: '56799',
    up: '100',
    down: '100',
    icon: '//img.alicdn.com/tfs/TB1aTaIgRTH8KJjy0FiXXcRsXXa-132-123.png',
  },
  {
    meta: '话题曝光',
    total: '56799',
    up: '100',
    down: '100',
    icon: '//img.alicdn.com/tfs/TB1dTaIgRTH8KJjy0FiXXcRsXXa-120-120.png',
  },
  {
    meta: '话题曝光',
    total: '56799',
    up: '100',
    down: '100',
    icon: '//img.alicdn.com/tfs/TB1OuuTgL6H8KJjy0FjXXaXepXa-132-126.png',
  },
];

export default class TopicCard extends Component {
  static displayName = 'TopicCard';

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <IceContainer
        style={styles.container}
        className="tab-card"
        title="数据概览"
      >
        <div className="topic-card">
          <div style={styles.horizontalWraper}>
            {dataSource.map((item, idx) => {
              return (
                <div
                  style={styles.topicCardItem}
                  className="topic-card-item"
                  key={`card-item-${idx}`}
                >
                  <div style={styles.cover}>
                    <img alt="icon" src={item.icon} style={styles.icon} />
                  </div>
                  <div style={styles.content}>
                    <div style={styles.meta}>{item.meta}</div>
                    <div style={styles.total}>{item.total}</div>
                    <div style={styles.compareText}>
                      较前日 <span style={styles.up}>↑+{item.up}</span>
                    </div>
                    <div style={styles.compareText}>
                      近7天 <span style={styles.down}>↓-{item.down}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '0 0 20px 0',
  },
  icon: {
    width: '44px',
    height: '41px',
  },
  horizontalWraper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {},
  cover: {
    backgroundColor: '#e9f1ff',
    marginRight: '10px',
    height: '70px',
    width: '70px',
    borderRadius: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    fontSize: '12px',
    color: '#333333',
  },
  total: {
    fontSize: '24px',
    color: '#333333',
  },
  compareText: {
    fontSize: '12px',
    color: '#999999',
  },
  up: {
    color: '#fc5848',
  },
  down: {
    color: '#64d874',
  },
};
