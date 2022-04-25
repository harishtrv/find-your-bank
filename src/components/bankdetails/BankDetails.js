import React from 'react';
import { connect } from 'react-redux';
import style from './bankdetails.module.css';
import { setFavoriteBanks } from '../../actions'
class BankDetails extends React.Component {
  renderFavoriteButton = (details) => {
    let existingBank = this.props.favorites.filter(bank => bank.ifsc === details.ifsc);
    if (existingBank.length > 0)
      return <button className={style.disabledButton} disabled>Added to Favorites</button>
    return <button className={style.favButton}
      onClick={() => this.props.setFavoriteBanks(details)}>
      Add to Favorites
      </button>
  }
  render() {
    const ifsc = this.props.match.params.ifsc;
    let bankDetails = this.props.currentPageBanks.filter(bank => bank.ifsc === ifsc);
    if (bankDetails.length === 0) return <p>Not Found</p>;
    bankDetails = bankDetails[0];
    return (
      <div className={style.container}>
        {this.renderFavoriteButton(bankDetails)}
        <h2>Bank Details</h2>
        <p>Bank: {bankDetails.bank_name}</p>
        <p>Branch: {bankDetails.branch}</p>
        <p>IFSC: {bankDetails.ifsc}</p>
        <p>Bank ID: {bankDetails.bank_id}</p>
        <p>City: {bankDetails.city}</p>
        <p>State: {bankDetails.state}</p>
        <p>District: {bankDetails.district}</p>
        <p>Address: {bankDetails.address}</p>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    currentPageBanks: state.currentPageBanksStore.currentPage,
    favorites: state.favoriteBanksStore
  };
}
export default connect(mapStateToProps, { setFavoriteBanks })(BankDetails);
