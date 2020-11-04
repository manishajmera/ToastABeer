import React,{useEffect,useState} from 'react';
import {ListComponent,FilterComponent} from "../../Components";
import "./DashBoard.css";

export default function DashBoard() {
    const [beerList,setBeerList] = useState(null);
    const [filterList, setFilterList] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [query, setQuery] = useState("");
    const [paginationIndex,setPaginationIndex] = useState(1);
    const [numOfPages,setNumOfPages] = useState(1);
    const [currentPageItems,setCurrentPageItems] = useState([]);
    const [changeView,setChangeView] = useState("listView");



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
        setNumOfPages(Math.ceil(beerList.length/6));
        setCurrentPageItems(beerList.slice(0,6));
        setBeerList(beerList);
    },[]);

    const handleChange = (e) => {
        let searchedQuery = e.target.value.toUpperCase();
        let serchedItem=[];
        for(let i in beerList){
            if(beerList[i]["name"].toUpperCase().includes(searchedQuery)){
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
        setCurrentPageItems([...sortedList.slice(0,6)]);
    }

    const fetchPageData = (e,i)=>{
        if(i-1===0){
            setCurrentPageItems([...beerList.slice(0,6)]);
        }else{
            setCurrentPageItems([...beerList.slice(((i-1)*6)-1,(i-1)*6+5)]);
        }
        setPaginationIndex(i);
    }
    const pageIndex = () => {
        let h = [];
        console.log(paginationIndex);
        for(let i=0;i<numOfPages;i++) h.push(
            <span key={i} className={paginationIndex===i+1 ? "active" : ""} onClick={(e) =>  fetchPageData(e,i+1)}>{i+1}</span>
        )
        return h;
    }
    return (
        <div className="container">
                <FilterComponent filterList={filterList} setFilterList={setFilterList} />
                <div className="row margin-bottom">
                <div className="col col-sm-3"><button onClick={handleClick}>SortBy LikeCount</button></div>
                <div className="col col-sm-6"><input type="text" className="form-control" onChange={handleChange} value={query} placeholder="Enter Beer Name"/></div>
                <div className="col col-sm-3"><button onClick={(e)=>{
                    if(changeView==="listView") setChangeView("gridView"); else setChangeView("listView"); 
                }}>Change View</button></div>
            </div>
            {query ? <ListComponent listItems={filterData} hideSocialSection={true}/> : 
                            <ListComponent listItems={filterData.length>0 ? filterData : currentPageItems} hideSocialSection={true} numOfPages={numOfPages} fetchPageData={fetchPageData} view={changeView}/>
            }
                        {numOfPages && <div className="page-index">{pageIndex()}</div>}
                        
        </div>
    )
}
