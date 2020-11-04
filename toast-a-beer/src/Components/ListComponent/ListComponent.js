import React,{useEffect} from 'react';
import BeerCard from '../BeerCard/BeerCard';
import { connect  } from "react-redux";
import { Link } from "react-router-dom";
import "./ListComponent.css";
import Loader from '../Loader/Loader';


import {
    dispatchGetRandomBeer
} from "../../Redux/Actions/Actions";

function ListComponent({dispatchGetRandomBeer,beerList}) {
    console.log(beerList);
    let t;
    useEffect(() => {
        t = setInterval(dispatchGetRandomBeer,5000);
        return () => {
            clearInterval(t);
        }
    }, [dispatchGetRandomBeer])
    return (
        <div className="container">
            {beerList && beerList.map((item)=><BeerCard {...item}/>)}
            {/* <BeerCard {...item.fields } key={item.sys.id} sys={item.sys}  /> */}
       </div>
    )
}

function mapStateToProps(state) {
    return {
        beerList:state.beerList
    };
  }
  
  const mapDispatchToProps = {
    dispatchGetRandomBeer,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);