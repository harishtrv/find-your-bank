import { combineReducers } from 'redux';

const allBanksReducer = (state = { allBanks: [] }, action = {}) => {
  if (action.type === 'UPDATE_ALL') {
    return { allBanks: action.payload };
  }
  else {
    return state;
  }
};

const currentPageReducer = (state = { currentPage: [] }, action = {}) => {
  if (action.type === 'UPDATE_PAGE') {
    return { currentPage: action.payload };
  }
  else {
    return state;
  }
}

const queriedBanksReducer = (state = { queriedBanks: [] }, action = {}) => {
  if (action.type === 'UPDATE_QUERY_RESULT') {
    return { queriedBanks: action.payload };
  }
  else {
    return state;
  }
}

const favoriteBanksReducer = (state = [], action = {}) => {
  if (action.type === 'UPDATE_FAVORITES') {
    let record = state.filter(banks => banks.ifsc === action.payload.ifsc);
    if (record.length !== 0) return state;
    return [...state, action.payload];
  }
  else {
    return state;
  }
}

export default combineReducers({
  banksStore: allBanksReducer,
  currentPageBanksStore: currentPageReducer,
  queriedBanksStore: queriedBanksReducer,
  favoriteBanksStore: favoriteBanksReducer
});
