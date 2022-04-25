import React from 'react';
import BankList from '../bankList/BankList';

class TableComponent extends React.Component {
  renderData = () => {
    return this.props.list.map(bank => <tr key={BankList.ifsc} id={bank.ifsc}>
      <td>{bank.bank_name}</td>
      <td>{bank.branch}</td>
      <td>{bank.ifsc}</td>
      <td>{bank.bank_id}</td>
      <td>{bank.address}</td>
      <td>{bank.city}</td>
      <td>{bank.district}</td>
      <td>{bank.state}</td>
    </tr>);
  };
  render() {
    if (this.props.loading) {
      return <h3>...loading</h3>;
    }
    else if (this.props.list.length === 0) {
      return <h3>No Records Found</h3>;
    }
    return (
      <table>
        <tbody onDoubleClick={this.props.doubleClickHandler}>
          <tr>
            <th>Bank Name</th>
            <th>Branch</th>
            <th>IFSC</th>
            <th>Bank Id</th>
            <th>Address</th>
            <th>City</th>
            <th>District</th>
            <th>State</th>
          </tr>
          {this.renderData()}
        </tbody>
      </table>
    );
  }
}

export default TableComponent;
