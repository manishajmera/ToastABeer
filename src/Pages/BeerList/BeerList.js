import React , {useEffect} from 'react'
import {ListComponent} from "../../Components";
import { connect  } from "react-redux";
import { Link } from "react-router-dom";
import {
    dispatchGetRandomBeer
} from "../../Redux/Actions/Actions";
function BeerList({dispatchGetRandomBeer,beerList}) {
    let t;
    useEffect(() => {
        t = setInterval(dispatchGetRandomBeer,5000);
        
        return () => {
            clearInterval(t);
        }
    }, [dispatchGetRandomBeer])
    return (
        <>
        <Link to='/dashboard'>Dashboard</Link>
        <ListComponent listItems={beerList}/>
        </>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(BeerList);
