import * as types from "../Actions/actiontypes";

const Reducers = (state = {loader:false}, action) => {
  switch (action.type) {
    case types.BEERLIST:
      return Object.assign({}, state, {
        beerList: action.beerList
      });
    case types.BeerDetail:
      return Object.assign({}, state, {
        beerData: action.beerData
      });
    case types.UNIQUEBEERLIST:
      return Object.assign({}, state, {
        uniqueBeer: action.uniqueBeer
      });
    default:
      return state;
  }
};

export default Reducers;
