import React,{useEffect} from 'react';
import BeerCard from '../../Components/BeerCard/BeerCard';
import { connect  } from "react-redux";
import {
    dispatchGetBeerDetails
} from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";

function BeerDetail({beerData,dispatchGetBeerDetails}) {
    let { id } = useParams();
    useEffect(() => {
        dispatchGetBeerDetails(id);
    }, [])
    console.log(beerData);
    return (
       beerData ? <BeerCard {...beerData[0]}/> : null
    )
}

const mapStateToProps = (state) =>{
    return{
        beerData:state.beerData
    };
}

const mapDispatchToProps = {
    dispatchGetBeerDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(BeerDetail);
