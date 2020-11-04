import React from 'react';
import BeerCard from '../BeerCard/BeerCard';
import "./ListComponent.css";


export default function ListComponent({listItems,hideSocialSection,numOfPages,fetchPageData}) {
    const pageIndex = () => {
        let h = [];
        for(let i=0;i<numOfPages;i++) h.push(
        <span onClick={(e) =>  fetchPageData(e,i+1)}>{i+1}</span>
        )
        return h;
    }
    
    return (
        <div className="container">
            {listItems && listItems.map((item,index)=><BeerCard {...item} key={`${item.id}-${index}`} hideSocialSection={hideSocialSection}/>)}
            {numOfPages && pageIndex()}
            {/* <BeerCard {...item.fields } key={item.sys.id} sys={item.sys}  /> */}
       </div>
    )
}

