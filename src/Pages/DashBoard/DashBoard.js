import React,{useEffect,useState} from 'react';
import {ListComponent,FilterComponent} from "../../Components";

export default function DashBoard() {
    const [beerList,setBeerList] = useState(null);
    const [filterList, setFilterList] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [query, setQuery] = useState("");
    const [paginationIndex,setPaginationIndex] = useState(1);
    const [numOfPages,setNumOfPages] = useState(1);


    useEffect(()=>{
        if(filterList && filterList.length>0){
            
        }
    },[filterList]);

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
        setNumOfPages(Math.ceil(beerList.length/5));
        setBeerList(beerList);
    },[]);

    const handleChange = (e) => {
        let searchedQuery = e.target.value;
        let serchedItem=[];
        for(let i in beerList){
            if(beerList[i]["name"].includes(searchedQuery)){
                serchedItem.push(beerList[i]);
            }
        }
        setQuery(e.target.value);
        setfilterData([...serchedItem]);
    }

    const handleClick =()=> {
        let sortedList = beerList;
        sortedList.sort((a,b)=>{
            return a.likeCount<b.likeCount ? 1 : -1;
        });
        setBeerList([...sortedList]);
    }
    console.log(numOfPages);
    return (
        <div>
            <FilterComponent filterList={filterList} setFilterList={setFilterList} />
            <input type="text" onChange={handleChange} value={query} placeholder="Enter Beer Name"/>
            <button onClick={handleClick}>SortBy LikeCount</button>
            <ListComponent listItems={filterData.length>0 ? filterData : beerList} hideSocialSection={true} numOfPages={numOfPages}/>
            {query && <ListComponent listItems={filterData} hideSocialSection={true}/>}
        </div>
    )
}
