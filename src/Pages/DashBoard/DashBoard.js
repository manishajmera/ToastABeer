import React, { useEffect, useState } from "react";
import { ListComponent, FilterComponent } from "../../Components";
import "./DashBoard.css";

export default function DashBoard() {
  const [state, setState] = useState({
    beerList: [],
    query: "",
    paginationIndex: 1,
    changeView: "listView",
    currentPageItems: [],
    filterData: [],
    numOfPages: 1,
    foodFilterList: [],
    withoutFilterFlag: true,
  });


  useEffect(() => {
    let likedList = JSON.parse(localStorage.getItem("beerLikeList"));
    let beerList = JSON.parse(localStorage.getItem("beerList"));
    for (let j in beerList) {
      beerList[j].likeCount = 0;
    }
    for (let i in likedList) {
      for (let j in beerList) {
        if (likedList[i].id === beerList[j].id) {
          beerList[j].likeCount = likedList[i].likeCount;
          break;
        }
      }
    }
    setState({
      ...state,
      ...{
        beerList: beerList,
        currentPageItems: beerList.slice(0, 6),
        numOfPages: Math.ceil(beerList.length / 6),
      },
    });
  }, []);

  const handleChange = (e) => {
    let searchedQuery = e.target.value.toUpperCase();
    let serchedItem = [];
    let beerList = state.beerList;
    for (let i in beerList) {
      if (beerList[i]["name"].toUpperCase().includes(searchedQuery.trim())) {
        serchedItem.push(beerList[i]);
      }
    }
    setState({
      ...state,
      ...{
        query: e.target.value,
        filterData: serchedItem,
        withoutFilterFlag: e.target.value ? false : true,
      },
    });
  };

  const handleClick = () => {
    let sortedList = state.beerList;
    sortedList.sort((a, b) => {
      return a.likeCount < b.likeCount ? 1 : -1;
    });
    setState({ ...state, ...{ currentPageItems: sortedList.slice(0, 6) } });
  };

  const fetchPageData = (e, i) => {
    let currentPageItems;
    if (i - 1 === 0) {
      currentPageItems = state.beerList.slice(0, 6);
    } else {
      currentPageItems = state.beerList.slice((i - 1) * 6 - 1, (i - 1) * 6 + 5);
    }
    setState({
      ...state,
      ...{ paginationIndex: i, currentPageItems: currentPageItems },
    });
  };
  const pageIndex = () => {
    let h = [];
    for (let i = 0; i < state.numOfPages; i++)
      h.push(
        <span
          key={i}
          className={state.paginationIndex === i + 1 ? "active" : ""}
          onClick={(e) => fetchPageData(e, i + 1)}
        >
          {`${i + 1}  `}
        </span>
      );
    return h;
  };
  const handleIngredientFilter = () => {
    let name = document.getElementById("ingredientName").value;
    let value = document.getElementById("ingredientValue").value;
    let data = [];
    let traversalData =
      state.filterData.length > 0 ? state.filterData : state.beerList;
    for (let i in traversalData) {
      let dataCheck = traversalData[i].ingredients.hops;
      for (let j in dataCheck) {
        if (
          dataCheck[j].name.toUpperCase() === name.toUpperCase().trim() &&
          dataCheck[j].amount.value <= value
        ) {
          data.push(traversalData[i]);
          break;
        }
      }
    }
    document.getElementById("ingredientName").value = "";
    document.getElementById("ingredientValue").value = "";
    setState({ ...state, ...{ filterData: data,withoutFilterFlag:false } });
  };
  const setFoodFilterList = (list) => {
    let data = [];
    let traversalData =
      state.filterData.length > 0 ? state.filterData : state.beerList;

    if (list && list.length > 0) {
        for (let j in traversalData) {
            let food_pairing = traversalData[j].food_pairing;
            let flag = 0;
            for(let k in food_pairing){
                for (let i in list) {
                    if(food_pairing[k].toUpperCase().includes(list[i].toUpperCase().trim())) {
                        flag=1;   
                        break;
                    }
                }
                if(flag===1) break;
            }
            if(flag===1) {
                data.push(traversalData[j])
            }
        }
      }
    setState({
      ...state,
      ...{
        filterData: data,
        withoutFilterFlag: state.foodFilterList.length > 0 ? false : true,
        foodFilterList:list
      },
    });
  };
  const clearAllFilter = () => {
    setState({
        ...state,
        ...{
          withoutFilterFlag: true,
          foodFilterList:[]
        },
      });
  }
  return (
    <div className="container">
      <FilterComponent
        foodFilterList={state.foodFilterList}
        setFoodFilterList={setFoodFilterList}
        handleIngredientFilter={handleIngredientFilter}
      />
      <div className="row margin-bottom">
        <div className="col col-sm-2">
          <button onClick={handleClick}>SortBy LikeCount</button>
        </div>
        <div className="col col-sm-1">
          <button
            onClick={(e) => clearAllFilter()}
          >
            Clear
          </button>
        </div>
        <div className="col col-sm-6">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={state.query}
            placeholder="Enter Beer Name"
          />
        </div>
        <div className="col col-sm-2">
          <button
            onClick={(e) => {
              if (state.changeView === "listView")
                setState({ ...state, ...{ changeView: "gridView" } });
              else setState({ ...state, ...{ changeView: "listView" } });
            }}
          >
            Change View
          </button>
        </div>
      </div>
      {state.withoutFilterFlag && (
        <ListComponent
          listItems={state.currentPageItems}
          hideSocialSection={true}
          numOfPages={state.numOfPages}
          fetchPageData={fetchPageData}
          view={state.changeView}
        />
      )}
      {
      !state.withoutFilterFlag && (state.query ||
      state.filterData.length > 0) ? (
        <ListComponent listItems={state.filterData} hideSocialSection={true} />
      ) : (
        !state.withoutFilterFlag ? <span>No results found....</span> : null
      )}
      {state.numOfPages && state.withoutFilterFlag && (
        <div className="page-index">{pageIndex()}</div>
      )}
    </div>
  );
}
