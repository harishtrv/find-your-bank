import React from 'react';
import BankList from '../bankList/BankList';
import Loader from "react-loader-spinner";

class TableComponent extends React.Component {
  renderData = () => {
    return this.props.list.map(bank => <tr key={BankList.ifsc} id={bank.ifsc} style={{curser:'pointer'}}>
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
        <div style={{margin: '20px', top:'7vh', left: '30vw', position: 'relative'}}>
          <Loader
            type="Rings"
            color="rgb(0, 199, 0)"
            height={200}
            width={200}
          />
        </div>);
    }
    else if (this.props.list.length === 0) {
       return <h3 style={{margin: '20px', top:'7vh', left: '30vw', position: 'relative'}}> No Records Found</h3>;
    }
    return (
      <table>
        <tbody onClick={this.props.onClickHandler}>
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
