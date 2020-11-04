import React,{useState} from 'react';
import { Link } from "react-router-dom";
import "./BeerCard.css";

export default function BeerCard(props) {
    let [likeCount,setLikeCount]=useState(0);
    let [comment,setComment] = useState([]);
    let [commentText,setCommentText] = useState("");
    const handleClick = (e,id) => {
        let localStorageDataOfLikes = localStorage.getItem("beerLikeList") ? JSON.parse(localStorage.getItem("beerLikeList")) : [];
        let flag = false;
        console.log(localStorageDataOfLikes)
        if(localStorageDataOfLikes){
            for(let i in localStorageDataOfLikes){
                console.log(i);
            }
        }
        if(!flag){
            localStorageDataOfLikes.push({id:id,likeCount:likeCount,comments:comment});
            localStorage.setItem("beerLikeList",JSON.stringify(localStorageDataOfLikes));
        }
        setLikeCount(++likeCount);
    }
    const handleOnKeyPress = (e) => {
        if(e.which==13){
            let comments = comment;
            comments.push(commentText);
            setComment(comments);
            setCommentText("");
        }
    }
    return (
        <div className="row card" key={props.id} id={props.id}>
            <div className="col col-sm-6 col-xs-12 no-float">
            <Link to={`/${props.id}`}><h2>{props.name}</h2></Link>
                <p>{props.tagline}</p>
            </div>
            <div className="col col-sm-6 col-xs-12 no-float align">     
                <img src={props.image_url ? props.image_url : '/default_beer.jpg'} alt="beer_image" height="80px" width="80px"/>
                {!props.hideSocialSection ? <> <button onClick={(e)=>handleClick(e,props.id)}>{`Likes:${likeCount}`}</button>
                {comment && comment.length>0 && comment.map((item,index)=><p key={index}>{item}</p>)}
                <input type="text" onChange={(e)=>setCommentText(e.target.value)} onKeyPress={handleOnKeyPress} value={commentText} /> </>
                :<span>Likes:{`${props.likeCount ? props.likeCount : 0}` }</span>}
            </div>
        </div>
    )
}





