import BankAPI from '../api/BankAPI';

export const setAllBanks = (city) => async dispatch => {
  let bankList = [];
  var now = new Date().getTime();
  let expirationTimeInMS = 60 * 60 * 1000; //1 hour
  var initialTime = localStorage.getItem('initialTime');
  if (initialTime == null) {
    localStorage.setItem('initialTime', now)
  } else if (now - initialTime > expirationTimeInMS) {
    localStorage.clear()
    localStorage.setItem('initialTime', now);
  }
  if (localStorage.getItem(city)) {
    bankList = JSON.parse(localStorage.getItem(city));
  }
  else {
    const response = await BankAPI.get('/banks', { params: { city } });
    if (response && response.status === 200) {
      bankList = response.data;
      localStorage.setItem(city, JSON.stringify(bankList))
    }
  }
  dispatch({ type: 'UPDATE_ALL', payload: bankList });
  dispatch({ type: 'UPDATE_QUERY_RESULT', payload: bankList });
  dispatch({ type: 'UPDATE_PAGE', payload: bankList.slice(0, 10) });
}

export const setCurrentPageBanks = (banks) => dispatch => {
  dispatch({ type: 'UPDATE_PAGE', payload: banks });
}

export const setQueriedBanks = (queriedBanks) => dispatch => {
  dispatch({ type: 'UPDATE_QUERY_RESULT', payload: queriedBanks });
}
export const setFavoriteBanks = (favoriteBanks) => dispatch => {
  dispatch({ type: 'UPDATE_FAVORITES', payload: favoriteBanks });
}
