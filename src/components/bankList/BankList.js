import React from 'react';
import { connect } from 'react-redux';
import styles from './bankList.module.css';
import Pagination from '../pagination/Pagination';
import DropDown from '../dropdown/DropDown';
import { setAllBanks, setCurrentPageBanks, setQueriedBanks } from '../../actions';
import history from '../../history';
import TableComponent from '../tableComponent/TableComponent';
import SearchComponent from '../search/SearchComponent';
import { AiFillEdit } from 'react-icons/ai';

class BankList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, currentPageNumber: 1, category: 'BANK', rowsPerPage: 10 };
    this.cityOptions = [{ value: 'MUMBAI', name: 'Mumbai' },
    { value: 'PUNE', name: 'Pune' },
    { value: 'BANGALORE', name: 'Bangalore' },
    { value: 'CHENNAI', name: 'Chennai' },
    { value: 'DELHI', name: 'Delhi' }];
    this.rowsInputRef = React.createRef();
  }

  componentDidMount() {
    this.cityChangeHandler('MUMBAI');
  }
  setCurrentPage = (pageNumber) => {
    this.props.setCurrentPageBanks(this.props.queriedBanks.slice((pageNumber - 1) * this.state.rowsPerPage, pageNumber * this.state.rowsPerPage))
    this.setState({ currentPageNumber: pageNumber });
  }
  cityChangeHandler = async (city) => {
    this.setState({ loading: true });
    await this.props.setAllBanks(city);
    this.setState({ loading: false, currentPageNumber: 1 });
  }
  gotoBankDetails = (e) => {
    if (e.target.tagName === 'TD') {
      history.push(`/bank-details/${e.target.parentNode.id}`);
    }
  }
  rowNumberEditor = () => {
    if (this.state.loading || this.props.currentPageBanks.length === 0) return null;

    return <div onClick={() => this.rowsInputRef.current.focus()}>rows per page <AiFillEdit />:
      <input className={styles.rowsInput} type='number' value={this.state.rowsPerPage}
        ref={this.rowsInputRef}
        onChange={(e) => {
          this.setState({ rowsPerPage: e.target.value });
          if (e.target.value) {
            this.props.setCurrentPageBanks(this.props.queriedBanks.slice(0, e.target.value))
          }
        }} />
    </div>
  }
  render() {
    return (
      <div>
        <h3 style={{ margin: '5px' }}>All Banks</h3>
        <div className={styles.topBar} style={this.state.loading || this.props.currentPageBanks.length === 0 ? { position: 'fixed' } : {}}>
          <DropDown label="Select City" onChangeHandler={e => this.cityChangeHandler(e.target.value)}
            data={this.cityOptions} />
          <SearchComponent resetCurrentPage={() => this.setState({ currentPageNumber: 1 })} />
        </div>
        <br />
        <div className={styles.banksTable}>
          <TableComponent list={this.props.currentPageBanks} loading={this.state.loading} onClickHandler={this.gotoBankDetails} />
        </div>
        <div className={styles.rowNumberEditor}>
          {this.rowNumberEditor()}
          <Pagination paginationStatus={!this.state.loading}
            currentPage={this.state.currentPageNumber}
            totalRecords={this.props.queriedBanks.length}
            recordsPerPage={this.state.rowsPerPage ? this.state.rowsPerPage : 10}
            setCurrentPage={this.setCurrentPage}
          />
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allBankList: state.banksStore.allBanks,
    currentPageBanks: state.currentPageBanksStore.currentPage,
    queriedBanks: state.queriedBanksStore.queriedBanks
  };
}
export default connect(mapStateToProps, { setAllBanks, setCurrentPageBanks, setQueriedBanks })(BankList);
