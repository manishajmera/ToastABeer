import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BeerCard.css";
import ComplementFood from "../ComplementFoodList/ComplementFood";
import CommentBox from "../CommentBox/CommentBox";

export default function BeerCard(props) {
    const [state,setState] = useState({
        likeCount:0,
        comment:[],
        commentText:""
    })
  const setCommentText = (value) => {
      setState({...state,commentText:value})
  }
  const handleClick = (e, id) => {
    let localStorageDataOfLikes = localStorage.getItem("beerLikeList")
      ? JSON.parse(localStorage.getItem("beerLikeList"))
      : [];
    let flag = false;
    if(localStorageDataOfLikes){
      for(let i in localStorageDataOfLikes){
        if(localStorageDataOfLikes[i].id===id){
          localStorageDataOfLikes[i].likeCount++;
          flag=true;
          break;
        }
      }
  }
    if (!flag) {
      localStorageDataOfLikes.push({
        id: id,
        likeCount: state.likeCount,
        comments: state.comment,
      });
    }
    localStorage.setItem(
      "beerLikeList",
      JSON.stringify(localStorageDataOfLikes)
    );
    setState({...state,likeCount:++state.likeCount});
  };
  const handleOnKeyPress = (e) => {
    if (e.which === 13) {
      let comments = state.comment;
      comments.push(state.commentText);
      setState({...state,...{commentText:"",comment:state.comment}});
    }
  };
  return (
      <>
      <div className={props.gridCls ? props.gridCls : "col col-sm-6 offset-sm-3 card"}>
        <div className="container top-content">
          <div className="row">
            <div className="col col-sm-3">
              <img
                src={props.image_url ? props.image_url : "/default_beer.jpg"}
                alt="beer_image"
                height="180px"
                width="80px"
              />
            </div>
            <div className="col col-sm-9">
              <Link to={`/${props.id}`}>
                <h2 className="heading">{props.name}</h2>
              </Link>
              <p className="text-secondary">{props.tagline}</p>
            </div>
          </div>
        </div>
       
        <div className="container">
        <ComplementFood complementFood={props.food_pairing}/>
        {!props.hideSocialSection ? <>
          <div className="col col-sm-12 like-btn">
            <i className="fa fa-thumbs-up" aria-hidden="true" onClick={(e) => handleClick(e, props.id)}></i> {state.likeCount}
            </div>
            <CommentBox comment={state.comment} commentText={state.commentText} setCommentText={setCommentText} handleOnKeyPress={handleOnKeyPress}/>
            </> :
               <div className="col col-sm-12">
                Like Count:- {props.likeCount}
               </div>
}
          </div>
        </div>
        </>
  );
}
