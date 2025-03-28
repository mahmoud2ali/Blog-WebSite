import { Link, useParams } from "react-router-dom";
import "./postDetails.css"
import {useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import AddComment from "../../components/comments/AddComment";
import EditForm from "../../components/postEditForm/EditForm";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost, toggleLike, deletePost } from "../../redux/apiCalls/postApiCall";
import {useNavigate} from "react-router-dom";
import CommentList from "../../components/comments/CommentList";

const PostDetails = ()=> {
    
    const navigate = useNavigate();

    const [editForm, setEditForm] = useState(false);

    const [add_comment, setAddComment] = useState(true);
  
    const handleForms = (e,num) => {
        e.preventDefault();
        if (num === 1)
        {
            if(editForm == true)
                setEditForm(false);

            setAddComment(prev=>!prev);
        }
        else
        {
            if(add_comment == true)
                setAddComment(false);
            setEditForm(prev=>!prev);
        }
    }

    const {id} = useParams();
    const {user} = useSelector(state => state.auth);
    const {singlePost} = useSelector(state => state.post);
    const dispatch = useDispatch()

    const deletPostHandler = ()=> {
    


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
                dispatch(deletePost(singlePost._id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Post has been deleted.",
                    icon: "success"
                });
                setTimeout(() => {
                    navigate("/");
                  
                }, 3000);
            }
          });     
    }

  
    useEffect(()=>{
        dispatch(getSinglePost(id));
    },[dispatch, id])
    // console.log("post details: ", singlePost?.comments);
    // console.log("userID :" ,user?._id, "\npost's userID: ", singlePost?.user?._id);;
    
    return(
        <section className="post-details">
            <ToastContainer />
            <div className="post-form-above">
                <Link className="user" to={"/profile/1"}>
                    <img className="userImage" src={singlePost?.user?.profilePhoto?.url}></img>
                    <div>
                        <div>{singlePost?.user?.username}</div>
                        {/* <span>{singlePost?.createdAt}</span> */}
                        <span>{new Date(singlePost?.createdAt).toDateString()}</span>
                    </div>
                </Link>
                
                <p>{singlePost?.title}</p>
                <p className="desc">{singlePost?.description}</p>
                <img src={singlePost?.image?.url} />
                <div className="line"></div>
                <div className="edit">
                {user &&                     
                    <div className="likes-comments">
                        <div>
                            {singlePost?.likes?.length} 
                            <i className= {
                                singlePost?.likes?.includes(user?._id) ? "bi bi-heart-fill heart comment" :"bi bi-heart heart comment"} 
                                onClick={()=> dispatch(toggleLike(singlePost?._id))}>
                            </i>
                         </div>
                        <div>
                            {singlePost?.comments?.length}
                            <i onClick={(e)=>handleForms(e, 1)} class="bi bi-chat-square comment"></i>
                        </div>
                    </div>
                }


                    {
                        singlePost?.user?._id === user?._id && 
                        (
                            <div>
                                <i onClick={(e)=>handleForms(e, 2)} className="bi bi-pencil-square"></i>
                                <i onClick={deletPostHandler} className="bi bi-trash"></i>
                            </div>
                        )
                    }
                </div>
            </div>

                {   
                    user? 
                    <div className="form-container">

                        <EditForm show={editForm} style={{display: add_comment? "none":"flex"}}/>
                        {
                            (<AddComment postId = {singlePost?._id} comments = {singlePost?.comments} show={add_comment} style={{display: editForm? "none":"flex"}}/> )
                        }
                    </div> :
                    <div className="comments-list-post-details-page">
                    <CommentList comments= {singlePost?.comments}/>
                    </div>
                    
                }

        

        </section>
    )
}

export default PostDetails;