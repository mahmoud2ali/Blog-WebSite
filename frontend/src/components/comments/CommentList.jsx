import Swal from "sweetalert2";
import moment from "moment";
import { useSelector } from "react-redux";

const CommentList = ({comments}) => {
   
    console.log(Array.isArray(comments));
     const deletCommentHandler = ()=> {
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

    
    return ( 
        <div>
            <h4 className="num-of-comments">Comments: {comments?.length}</h4>
            {comments?.map(comment => (
                <div key={comment}>
                    <div className="comment-item">
                        <div className="comment-item-username">{comment.usename}</div>
                        <div className="comment-item-time">{moment(comment.createdAt).fromNow()}</div>
                        <div className="comment-item-footer">
                            <div className="comment-item-text">{comment.text}</div>
                            <div>
                                {/* <i className="bi bi-pencil-square"></i> */}
                                {
                                    user && 
                                    <i onClick={deletCommentHandler} className="bi bi-trash"></i>
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