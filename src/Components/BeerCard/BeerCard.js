import React from 'react';
import { Link } from "react-router-dom";
import "./BeerCard.css";

export default function BeerCard(props) {
    return (
        <div className="row card" key={props.id}>
            <div className="col col-sm-6 col-xs-12 no-float">
                <h2>{props.name}</h2>
                <p>{props.tagline}</p>
            </div>
            <div className="col col-sm-6 col-xs-12 no-float align">
                
                <img src={props.image_url ? props.image_url : '/default_beer.jpg'} alt="beer_image" height="80px" width="80px"/>
                
            </div>
        </div>
    )
}




