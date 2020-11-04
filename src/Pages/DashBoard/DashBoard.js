import React,{useEffect,useState} from 'react';
import {ListComponent} from "../../Components";

export default function DashBoard() {
    const [beerList,setBeerList] = useState(null);
    useEffect(()=>{
        setBeerList(JSON.parse(localStorage.getItem("beerList")))
    },[])
    return (
        <div>
            <ListComponent listItems={beerList} />
        </div>
    )
}
