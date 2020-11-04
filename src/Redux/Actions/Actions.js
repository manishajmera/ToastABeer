import * as types from "./actiontypes";
import axios from "axios";



export const setAllList = (data) => ({
  type: types.BEERLIST,
  beerList:data
});
export const setLoader = () => ({
  type: types.LOADER,

});

export const dispatchGetRandomBeer = () => {
  return function(dispatch, getState) {
    // dispatch(setLoader())
    axios.get('https://api.punkapi.com/v2/beers/random')
    .then((response)=> {
      // handle success
      let data;
      if(getState().beerList)
        data = [...getState().beerList,...response.data]
      else data = response.data;
      console.log();
      dispatch(setAllList(data))
      // console.log(response);
    })
    .catch( (error)=> {
      // handle error
      console.log(error);
    })
  };
}