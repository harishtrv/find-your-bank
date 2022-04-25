import React from 'react';
import styles from './pagination.module.css';

class Pagination extends React.Component {
  prevButton() {
    if (this.props.currentPage === 1) {
      return <button className={styles.disabledButton} disabled>Prev</button>;
    }
    return <button className={styles.navButton}
      onClick={() => this.props.setCurrentPage(this.props.currentPage - 1)}>
      Prev
      </button>;
  }
  nextButton() {
    if (this.props.recordsPerPage === 0 || this.props.currentPage === (this.props.totalRecords / this.props.recordsPerPage)) {
      return <button className={styles.disabledButton} disabled>Next</button>;
    }
    return <button className={styles.navButton} onClick={() => this.props.setCurrentPage(this.props.currentPage + 1)}>Next</button>;
  }
  minusFive() {
    if (this.props.currentPage - 5 < 1) {
      return <button className={styles.disabledButton} disabled>-5</button>;
    }
    return <button className={styles.navButton} onClick={() => this.props.setCurrentPage(this.props.currentPage - 5)}>-5</button>;
  }
  plusFive() {
    if (this.props.recordsPerPage === 0 || this.props.currentPage + 5 > (this.props.totalRecords / this.props.recordsPerPage)) {
      return <button className={styles.disabledButton} disabled>+5</button>;
    }
    return <button className={styles.navButton} onClick={() => this.props.setCurrentPage(this.props.currentPage + 5)}>+5</button>;
  }
  render() {
    if (this.props.paginationStatus && this.props.totalRecords !== 0) {
      const startIndex = (this.props.currentPage - 1) * this.props.recordsPerPage;
      return <div>
        {this.prevButton()}
        {this.minusFive()}
        {startIndex + 1}-{this.props.currentPage * this.props.recordsPerPage} of {this.props.totalRecords}
        {this.plusFive()}
        {this.nextButton()}
      </div>
    }

    return null;
  }
}
export default Pagination;
