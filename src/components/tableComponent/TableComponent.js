import React from 'react';
import BankList from '../bankList/BankList';
import Loader from "react-loader-spinner";

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
      return (
          <div styele={{margin: '20px'}}>
            <h4>Loading...</h4>
            <Loader
              type="Rings"
              color="rgb(0, 199, 0)"
              height={200}
              width={200}
            />
          </div>);
    }
    else if (this.props.list.length === 0) {
       return <h3>No Records Found</h3>;
    }
    return (
      <table>
        <tbody onDoubleClick={this.props.doubleClickHandler}>
          <tr key='columnNames'>
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
