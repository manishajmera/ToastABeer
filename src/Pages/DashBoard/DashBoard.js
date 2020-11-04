import React,{useEffect,useState} from 'react';
import {ListComponent,FilterComponent} from "../../Components";

export default function DashBoard() {
    const [beerList,setBeerList] = useState(null);
    const [filterList,setFilterList] = useState(null);
    useEffect(()=>{
        let likedList = JSON.parse(localStorage.getItem("beerLikeList"));
        let beerList = JSON.parse(localStorage.getItem("beerList"));
        for(let j in beerList){
            beerList[j].likeCount = 0;
        }
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
        let sortedList = beerList;
        sortedList.sort((a,b)=>{
            return a.likeCount<b.likeCount ? 1 : -1;
        });
        setBeerList([...sortedList]);
    }
    console.log(beerList);
    return (
        <div>
            <FilterComponent />
            <button onClick={handleClick}>SortBy LikeCount</button>
            <ListComponent listItems={beerList} hideSocialSection={true}/>
        </div>
    )
}
