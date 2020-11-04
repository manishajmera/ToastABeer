import React from 'react'

export default function CommentBox({comment,setCommentText,commentText,handleOnKeyPress}) {
    return (
        <div>
            <div className="col col-sm-12">    
                {comment &&
                  comment.length > 0 && <>
                  <h4>Comments:-</h4>
                  {comment.map((item, index) =>             <div className="row">             <p key={index}>{item}</p></div>)}
                  </>
                  }
                <div className="col col-sm-12"> 
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={handleOnKeyPress}
                  value={commentText}
                  placeholder="Write a Comment...."
                />
                </div>
              </div>
        </div>
    )
}
