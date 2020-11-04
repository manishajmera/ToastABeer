import React,{useEffect} from 'react';
import BeerCard from '../BeerCard/BeerCard';
import { connect  } from "react-redux";
import "./ListComponent.css";
import {
    dispatchGetRandomBeer
} from "../../Redux/Actions/Actions";

export default function ListComponent({listItems,hideSocialSection}) {
    
    return (
        <div className="container">
            {listItems && listItems.map((item,index)=><BeerCard {...item} key={`${item.id}-${index}`} hideSocialSection={hideSocialSection}/>)}
            {/* <BeerCard {...item.fields } key={item.sys.id} sys={item.sys}  /> */}
       </div>
    )
}

