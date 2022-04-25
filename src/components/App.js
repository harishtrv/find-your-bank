import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import BankList from './bankList/BankList';
import BankDetails from './bankdetails/BankDetails';
import FavoritesBanks from './FavoritesBanks';
import LeftPanel from './leftPanel/LeftPanel';
import history from '../history';

export default function App() {
  return (
    <div style={{display:'flex', flexDirection: 'row'}}>
      <Router history={history}>
        <LeftPanel />
        <div style={{position:'relative', marginLeft: '150px'}}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/all-banks" exact component={BankList} />
          <Route path="/bank-details/:ifsc" exact component={BankDetails} />
          <Route path="/favorites" exact component={FavoritesBanks} />
        </Switch>
        </div>
      </Router>
    </div>
  );
}
