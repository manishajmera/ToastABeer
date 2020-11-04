import * as types from "./actiontypes";
import axios from "axios";



export const setAllList = (data) => ({
  type: types.BEERLIST,
  beerList:data
});
export const setLoader = () => ({
  type: types.LOADER,
});
export const setBeerData = (data) => ({
  type: types.BeerDetail,
  beerData:data
});

export const dispatchGetRandomBeer = () => {
  console.log(localStorage.getItem('beerList'));
  return function(dispatch, getState) {
    // dispatch(setLoader())
    axios.get('https://api.punkapi.com/v2/beers/random')
    .then((response)=> {
      // handle success
      let data;
      if(getState().beerList)
        data = [...getState().beerList,...response.data]
      else data = response.data;
      localStorage.removeItem("beerList");
      localStorage.setItem('beerList', JSON.stringify(data));
      dispatch(setAllList(data))
      // console.log(response);
    })
    .catch( (error)=> {
      // handle error
      console.log(error);
    })
  };
}
export const dispatchGetBeerDetails = (id) => {
  return function(dispatch, getState) {
    // dispatch(setLoader())
    axios.get(`https://api.punkapi.com/v2/beers/${id}`)
    .then((response)=> {
      dispatch(setBeerData(response.data))
    })
    .catch( (error)=> {
      // handle error
      console.log(error);
    })
  };
}