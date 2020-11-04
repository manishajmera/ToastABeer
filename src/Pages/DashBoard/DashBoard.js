import React,{useEffect,useState} from 'react';
import {ListComponent} from "../../Components";

export default function DashBoard() {
    const [beerList,setBeerList] = useState(null);
    useEffect(()=>{
        let likedList = JSON.parse(localStorage.getItem("beerLikeList"));
        let beerList = JSON.parse(localStorage.getItem("beerList"));
        for(let i in likedList){
            for(let j in beerList){
                if(likedList[i].id === beerList[j].id){
                    beerList[j].likeCount = likedList[i].likeCount;
                    break;
                }
            }
        }
        setBeerList(beerList);
    },[])
    const handleClick =()=> {

    }
    return (
        <div>
            <button onClick={handleClick}>SortBy LikeCount</button>
            <ListComponent listItems={beerList} hideSocialSection={true}/>
        </div>
    )
}
