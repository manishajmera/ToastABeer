import * as types from "./actiontypes";
import axios from "axios";



export const setAllList = (data) => ({
  type: types.BEERLIST,
  beerList:data
});
export const setBeerLikedList = (data) => ({
  type: types.BEERLIKEDLIST,
  beerLikedList:data
});
export const setLoader = () => ({
  type: types.LOADER,
});
export const setBeerData = (data) => ({
  type: types.BeerDetail,
  beerData:data
});
export const setUniqueElements = (data) => ({
  type: types.UNIQUEBEERLIST,
  uniqueBeer:data
})

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
      localStorage.removeItem("beerList");
      let uniqueElements = [];
      if(getState().uniqueBeer){
        uniqueElements = getState().uniqueBeer;
      }
     if(!uniqueElements.includes(response.data[0])){
        uniqueElements.push(response.data[0]);
      }
      localStorage.setItem('beerList', JSON.stringify(uniqueElements));
      dispatch(setAllList(data));
      dispatch(setUniqueElements(uniqueElements))
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
    axios.get(`https://api.punkapi.com/v2/beers/${id}`)
    .then((response)=> {
      dispatch(setBeerData(response.data[0]))
    })
    .catch( (error)=> {
      // handle error
      console.log(error);
    })
  };
}