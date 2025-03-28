import Swal from "sweetalert2";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";


const CommentList = ({comments}) => {
   
    const dispatch = useDispatch();

    // console.log(Array.isArray(comments));
     const deletCommentHandler = (commentId)=> {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteComment(commentId))
                  Swal.fire({
                    title: "Deleted!",
                    text: "Post has been deleted.",
                    icon: "success"
                  });
                }
              });
        }


        const {user} = useSelector(state => state.auth);
        // comments?.map(comment => {console.log(comment.userId)})
    // console.log(comments)
    return ( 
        <div>
            <h4 className="num-of-comments">Comments: {comments?.length}</h4>
            {comments?.map(comment => (
                <div key={comment}>
                    <div className="comment-item">
                        <div className="comment-item-username">{comment.userName}</div>
                        <div className="comment-item-time">{moment(comment.createdAt).fromNow()}</div>
                        <div className="comment-item-footer">
                            <div className="comment-item-text">{comment.text}</div>
                            <div>
                                {/* <i className="bi bi-pencil-square"></i> */}
                                {
                                    user._id == comment.userId && 
                                    <i onClick={() => deletCommentHandler(comment._id)} className="bi bi-trash"></i>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default CommentList;