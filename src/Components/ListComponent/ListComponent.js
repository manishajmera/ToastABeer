import React from 'react';
import BeerCard from '../BeerCard/BeerCard';
import "./ListComponent.css";

export default function ListComponent({listItems,hideSocialSection,view="listView",gridindex="4"}) {
    

    const gridView = () => {
        let h = [];
        if(listItems){
            for(let i=0;i<listItems.length;i+=gridindex-1){
                let newArray = listItems.slice(i,i+gridindex-1)
                    h.push(<div className="row" key={`${i}`}>
                         { newArray && newArray.map((item,index)=><BeerCard {...item} key={`${item.id}-${index}`}  hideSocialSection={hideSocialSection} gridCls={`col col-sm-${gridindex} card margin-left`}/>)}
                    </div>)
            }
        }
        return h;
    }
    
    return (
        <div className="container">
            {view==="listView" ? listItems && listItems.map((item,index)=>      <div className="row" key={`${item.id}-${index}`}><BeerCard {...item}  hideSocialSection={hideSocialSection}/></div>)
                :    gridView()
        
        }
            {/* <BeerCard {...item.fields } key={item.sys.id} sys={item.sys}  /> */}
       </div>
    )
}

