import React, { Component } from 'react';
import { Loading } from '@icedesign/base';
import dataSource from './list-data';
import ReactList from 'react-list';
import IceContainer from '@icedesign/container';
import avatar from './images/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png';

const fetchDataMethod = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataSource);
    }, 500);
  });
};

export default class ScrollList extends Component {
  static displayName = 'ScrollList';

  static defaultProps = {
    height: '300px',
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      total: 20,
      isLoading: false,
      pageSize: 20,
      pageNo: 0,
    };
  }

  fetchData = () => {
    this.setState({
      isLoading: true,
    });
    fetchDataMethod().then((res) => {
      if (res.status === 'SUCCESS') {
        this.setState((prevState) => {
          return {
            list: [...prevState.list, ...res.data.list],
            total: res.data.total,
            pageNo: prevState.pageNo + 1,
            isLoading: false,
          };
        });
      }
    });
  };

  renderItem = (index, key) => {
    return this.state.list[index] ? (
      <div key={key} style={styles.listItem}>
        <img src={avatar} style={styles.avatar} />
        <div style={styles.info}>
          <div style={styles.infoItem}>{this.state.list[index].name}</div>
          <div>This is the {index + 1} row</div>
        </div>
      </div>
    ) : (
      ''
    );
  };

  handleScroll = () => {
    const lastVisibleIndex = this.refs.list.getVisibleRange()[1];
    // 提前 5条 预加载
    if (
      lastVisibleIndex >= this.state.pageNo * this.state.pageSize - 5 &&
      !this.state.isLoading
    ) {
      this.fetchData();
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <IceContainer
        style={{ height: this.props.height, overflow: 'auto' }}
        onScroll={this.handleScroll}
      >
        <ReactList
          ref="list"
          itemRenderer={this.renderItem}
          length={this.state.total}
          pageSize={this.state.pageSize}
        />
      </IceContainer>
    );
  }
}

const styles = {
  listItem: {
    padding: 10,
    background: '#fff',
    borderBottom: '1px solid #ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    verticalAlign: 'middle',
  },
  info: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: 20,
  },
  infoItem: {
    marginBottom: '4px',
  },
};
