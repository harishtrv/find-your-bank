import React from 'react';
import { Link } from 'react-router-dom';
import style from './leftPanel.module.css';

class LeftPanel extends React.Component {
  render() {
    return <div className={style.leftLayout}>
      <Link to='/all-banks'>All Banks</Link>
      <Link to='/favorites'>Favorite Banks</Link>
    </div>;
  }
}
export default LeftPanel;
