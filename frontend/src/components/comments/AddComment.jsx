import { useState } from "react";
import { toast } from "react-toastify";
import "./addComment.css"
import CommentList from "./CommentList";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";

const AddComment = ({show, comments, postId}) => {
    
    const [text, setText] = useState("")

    console.log("props comments: ", comments);

    const dispatch = useDispatch()

    const addCommentHandler = (e)=> {
        // e.preventDefault();

        if(!text)
            return toast.error("You don't add any text");

        dispatch(createComment({text, postId}))
        // console.log(text);
    }

    return ( 
        <div>
            <form className= "add-comment-form" onSubmit={addCommentHandler} style={{clipPath: show && "polygon(0 0 , 100% 0, 100% 100% , 0 100%)", opacity: show? 1 : 0}}>
                <label form="add-comment">Add Comment</label>
                <input onChange={(e)=>{setText(e.target.value)}} value={text} type="text" id="add-comment"></input>
                <button type="submit" className="Add-comment-btn">Comment</button>
              <CommentList comments= {comments}/>
            </form>

        </div>
     );
}
 
export default AddComment;