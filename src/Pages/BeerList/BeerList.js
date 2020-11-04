import React , {useEffect} from 'react'
import {ListComponent} from "../../Components";
import { connect  } from "react-redux";
import { Link } from "react-router-dom";
import {
    dispatchGetRandomBeer
} from "../../Redux/Actions/Actions";
function BeerList({dispatchGetRandomBeer,beerList}) {
    let t;
    let element = document.getElementById("timer");
    if(element) element.scrollIntoViewIfNeeded();
    const getRandomBeer = () => {
        dispatchGetRandomBeer()
    }
    useEffect(() => {
        t = setInterval(getRandomBeer,5000);
        
        return () => {
            clearInterval(t);
        }
    }, [getRandomBeer])
    return (
        <>
        <Link to='/dashboard'>Dashboard</Link>
        <ListComponent listItems={beerList}/>
        <div id="timer">Timer             

            ---------
            Timer
        </div>
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
