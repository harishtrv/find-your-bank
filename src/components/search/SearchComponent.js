import React from 'react';
import { connect } from 'react-redux';
import Debounce from '../../utils/Debounce';
import DropDown from '../dropdown/DropDown';
import { setCurrentPageBanks, setQueriedBanks } from '../../actions';
import styles from './search.module.css';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: 'BANK' };
    this.categoryOptions = [{ value: 'BANK', name: 'Bank' }, { value: 'IFSC', name: 'IFSC' },
    { value: 'BRANCH', name: 'Branch' }, { value: 'STATE', name: 'State' }, { value: 'ID', name: 'Bank ID' }];

    this.searchInput = React.createRef();
  }
  search = (value) => {
    let result = [];
    this.props.resetCurrentPage();
    const upperCaseValue = value.toUpperCase();
    switch (this.state.category) {
      case 'BANK':
        result = this.props.allBankList.filter(bank => bank.bank_name === upperCaseValue);
        break;
      case 'IFSC':
        result = this.props.allBankList.filter(bank => bank.ifsc === upperCaseValue);
        break;
      case 'BRANCH':
        result = this.props.allBankList.filter(bank => bank.branch === upperCaseValue);
        break;
      case 'STATE':
        result = this.props.allBankList.filter(bank => bank.state === upperCaseValue);
        break;
      case 'ID':
        result = this.props.allBankList.filter(bank => bank.bank_id === Number(value));
        break;
      default:
        result=[];
    }
    this.props.setQueriedBanks(result);
    this.props.setCurrentPageBanks(result.slice(0, 10));
  }
  debouncedSearch = Debounce(this.search, 500)
  render() {
    return <>
      <DropDown label="Select Category" onChangeHandler={(e) => {
        this.setState({ category: e.target.value });
        if (this.searchInput.current.value) this.debouncedSearch(this.searchInput.current.value);
      }}
        data={this.categoryOptions} />
      <input type='text' ref={this.searchInput} className={styles.searchBox}
        placeholder={`Search By ${this.state.category}`}
        onChange={e => this.debouncedSearch(e.target.value)} />
    </>
  }
}

const mapStateToProps = (state) => {
  return {
    allBankList: state.banksStore.allBanks,
    currentPageBanks: state.currentPageBanksStore.currentPage,
    queriedBanks: state.queriedBanksStore.queriedBanks
  };
}
export default connect(mapStateToProps, { setCurrentPageBanks, setQueriedBanks })(SearchComponent);
