import React, { Component } from 'react';
import InfoWindow from './components/InfoWindow';
import WorkingIndex from './components/WorkingIndex';
import Transaction from './components/Transaction';
import Function from './components/Function';
import Warning from './components/Warning';
import WorkingCalendar from './components/WorkingCalendar';

export default class Analysis extends Component {
  static displayName = 'Analysis';

  render() {
    return (
      <div style={styles.container}>
        <InfoWindow />
        <WorkingIndex />
        <Transaction />
        <Function />
        <Warning />
        <WorkingCalendar />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    letterSpacing: '1px',
    padding: '16px',
  },
};
