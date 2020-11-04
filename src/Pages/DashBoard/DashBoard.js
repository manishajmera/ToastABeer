import React,{useEffect,useState} from 'react';
import {ListComponent,FilterComponent} from "../../Components";

export default function DashBoard() {
    const [beerList,setBeerList] = useState(null);
    const [filterList, setFilterList] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [query, setQuery] = useState("");
    // const [paginationIndex,setPaginationIndex] = useState(1);
    const [numOfPages,setNumOfPages] = useState(1);
    const [currentPageItems,setCurrentPageItems] = useState([]);


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
        setCurrentPageItems(beerList.slice(0,5));
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

    const fetchPageData = (e,i)=>{
        console.log(i);
        if(i-1===0){
            setCurrentPageItems(beerList.slice(0,5));
        }else{
            setCurrentPageItems(beerList.slice((i-1)*5-1,i*5));
        }
    }
    return (
        <div className="container">
                <FilterComponent filterList={filterList} setFilterList={setFilterList} />
                <div className="row">
                <div className="col col-sm-3"><button onClick={handleClick}>SortBy LikeCount</button></div>
                <div className="col col-sm-6"><input type="text" className="form-control" onChange={handleChange} value={query} placeholder="Enter Beer Name"/></div>
                <div className="col col-sm-3"><button onClick={handleClick}>View Change</button></div>
            </div>
            <ListComponent listItems={filterData.length>0 ? filterData : currentPageItems} hideSocialSection={true} numOfPages={numOfPages} fetchPageData={fetchPageData}/>
            {query && <ListComponent listItems={filterData} hideSocialSection={true}/>}
        </div>
    )
}
