import React from 'react';
import { connect } from 'react-redux';
import TableComponent from './tableComponent/TableComponent';

class FavoritesBanks extends React.Component {
  render() {
    return <div>
      <h3 style={{ margin: '5px' }}>Favorite Banks</h3>
      <TableComponent list={this.props.favorites} loading={false} doubleClickHandler={()=>{}} />
    </div>;
  }
}
const mapStateToProps = (state) => {
  return {
    favorites: state.favoriteBanksStore
  };
}
export default connect(mapStateToProps, null)(FavoritesBanks);
