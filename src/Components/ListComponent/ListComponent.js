import React from 'react';
import BeerCard from '../BeerCard/BeerCard';
import "./ListComponent.css";


export default function ListComponent({listItems,hideSocialSection,numOfPages,fetchPageData,view="listView",gridindex="4"}) {
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
            for(let i=0;i<listItems.length;i+gridindex){
                for(let j=i;j<=i;j++){
                    h.push(<div className="row" key={`${listItems[i].id}-${i}`}>
                         <BeerCard {...listItems[i]}  hideSocialSection={hideSocialSection} gridCls={`col col-sm-${gridindex}`}/>
                    </div>)
                }
             }
        }
        
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

