import React , {useEffect} from 'react'
import {ListComponent} from "../../Components";
import { connect  } from "react-redux";
import { Link } from "react-router-dom";
import "./BeerList.css";
import {
    dispatchGetRandomBeer
} from "../../Redux/Actions/Actions";
function BeerList({dispatchGetRandomBeer,beerList}) {
    // let element = document.getElementById("timer");
    // if(element) element.scrollIntoViewIfNeeded();
    
    useEffect(() => {
        const getRandomBeer = () => {
            dispatchGetRandomBeer()
        }
        let t = setInterval(getRandomBeer,5000);     
        return () => {
            clearInterval(t);
        }
    }, [dispatchGetRandomBeer])
    return (
        <>
        <div className="sticky-dashboard">
            <Link to='/dashboard'>Dashboard >></Link>
        </div>
        <ListComponent listItems={beerList}/>
        <div id="timer">Fetching some freshly brewed beer
            ------------->
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
