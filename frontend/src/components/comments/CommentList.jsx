import Swal from "sweetalert2";

const CommentList = () => {
   
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

    return ( 
        <div>
            <h4 className="num-of-comments">2 comments</h4>
            {[1, 2].map(comment => (
                <div key={comment}>
                    <div className="comment-item">
                        <div className="comment-item-username">Mahmoud Mohammded</div>
                        <div className="comment-item-time">2 hours ago</div>
                        <div className="comment-item-footer">
                            <div className="comment-item-text">hello, that is a new comment</div>
                            <div>
                                {/* <i className="bi bi-pencil-square"></i> */}
                                <i onClick={deletCommentHandler} className="bi bi-trash"></i>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default CommentList;