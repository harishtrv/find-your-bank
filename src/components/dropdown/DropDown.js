import React from 'react';
import styles from './dropdown.module.css';

class DropDown extends React.Component {
  showAllOptions() {
    return this.props.data.map(item => (<option key={item.value} value={item.value}>{item.name}</option>));
  }
  render() {
    return <div>
      <label>{this.props.label}: </label>
      <select className={styles.selection} onChange={(e) => this.props.onChangeHandler(e)}>
        {this.showAllOptions()}
      </select>
    </div>
  }
}

export default DropDown;