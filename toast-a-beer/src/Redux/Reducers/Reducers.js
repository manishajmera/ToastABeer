import * as types from "../Actions/actiontypes";

const Reducers = (state = {loader:false}, action) => {
  switch (action.type) {
    case types.BEERLIST:
      return Object.assign({}, state, {
        beerList: action.beerList
      });
    default:
      return state;
  }
};

export default Reducers;
