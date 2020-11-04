import React from 'react';
import BeerCard from '../BeerCard/BeerCard';
import "./ListComponent.css";

export default function ListComponent({listItems,hideSocialSection,numOfPages,fetchPageData,view="listView",gridindex="3"}) {
    const pageIndex = () => {
        let h = [];
        for(let i=0;i<numOfPages;i++) h.push(
        <span onClick={(e) =>  fetchPageData(e,i+1)}>{i+1}</span>
        )
        return h;
    }

    const gridView = () => {
        let h = [];
        if(listItems){
            for(let i=0;i<listItems.length;i+=gridindex){
                let newArray = listItems.slice(i,i+gridindex)
                    h.push(<div className="row" key={`${i}`}>
                         { newArray && newArray.map((item,index)=><BeerCard {...item} key={`${item.id}-${index}`}  hideSocialSection={hideSocialSection} gridCls={`col col-sm-${gridindex}`}/>)}
                    </div>)
            }
        }
        console.log(h)
        return h;
    }
    
    return (
        <div className="container">
            {view==="listView" ? listItems && listItems.map((item,index)=>      <div className="row" key={`${item.id}-${index}`}><BeerCard {...item}  hideSocialSection={hideSocialSection}/></div>)
                :    gridView()
        
        }
            {numOfPages && pageIndex()}
            {/* <BeerCard {...item.fields } key={item.sys.id} sys={item.sys}  /> */}
       </div>
    )
}

