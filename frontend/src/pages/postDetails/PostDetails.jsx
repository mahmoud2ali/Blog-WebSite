import { Link, useParams } from "react-router-dom";
import { posts } from "../../dummyData";
import "./postDetails.css"
import {useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import AddComment from "../../components/comments/AddComment";
import EditForm from "../../components/postEditForm/EditForm";
import Swal from "sweetalert2";

const PostDetails = ()=> {
    

    const [editForm, setEditForm] = useState(false);

    // const [image, setImage] = useState(null);

    const [add_comment, setAddComment] = useState(true);



    
    useEffect(()=>{
        window.scrollTo({top: 0, behavior:"smooth"});
    },[])

  
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
              Swal.fire({
                title: "Deleted!",
                text: "Post has been deleted.",
                icon: "success"
              });
            }
          });
    }


    const {id} = useParams();
    const post = posts.find(p => p._id === parseInt(id));
    return(
        <section className="post-details">
            <ToastContainer />
            <div className="post-form-above">
                <Link className="user" to={"profile/1"}>
                    <img className="userImage" src={post.user.image}></img>
                    <div>
                        <div>{post.user.username}</div>
                        <span>{post.createdAt}</span>
                    </div>
                </Link>
                
                <p>{post.title}</p>
                <p className="desc">{post.description}</p>
                <img src={post.image} />
                <div className="line"></div>
                <div className="edit">
                    <div className="likes-comments">
                        <div>{post.likes.length} <i class="bi bi-heart heart"></i> </div>
                        <div>
                            5
                            <i onClick={(e)=>handleForms(e, 1)} class="bi bi-chat-square comment"></i>
                        </div>
                    </div>
                    <div>
                        <i onClick={(e)=>handleForms(e, 2)} className="bi bi-pencil-square"></i>
                        <i onClick={deletPostHandler} className="bi bi-trash"></i>
                    </div>
                </div>
            </div>
                <div className="form-container">
                    <EditForm show={editForm} style={{display: add_comment? "none":"flex"}}/>

                    <AddComment show={add_comment} style={{display: editForm? "none":"flex"}}/> 
                </div>


        </section>
    )
}

export default PostDetails;