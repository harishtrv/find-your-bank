import BankAPI from '../api/BankAPI';

export const setAllBanks = (city) => async dispatch => {
  let bankList = [];
  if (localStorage.getItem(city)) {
    bankList = JSON.parse(localStorage.getItem(city));
  }
  else {
    const response = await BankAPI.get('/banks', { params: { city } });
    bankList = response.data;
    localStorage.setItem(city, JSON.stringify(bankList))
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
