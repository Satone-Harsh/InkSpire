import { useContext, useEffect, useState } from "react";
import "./Singlepost.css"
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";

const Singlepost = () => {
  const location=useLocation();
  ////////////////
  const path= location.pathname.split("/")[2];
  /////////////
  const [post,setPost]=useState({});
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [updateMode,setUpdateMode]=useState(false);
  const {user}=useContext(Context);


  useEffect(()=>{
    const getPost = async()=>{
      const res=await axios.get("/post/"+path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  },[path]);

  useEffect(() => {
    // Scroll to the top 
    window.scrollTo(0, 0);
  }, []);

  const handleDelete=async()=>{
    try{
      await axios.delete(`/post/${post._id}`,
      {data:{username:user.username},
    });
      window.location.replace("/");
    }catch(err){
      console.log("delete err"+err);
    }
  }

  const handleUpdate=async()=>{
    try{
      await axios.put(`/post/${post._id}`,{
      username:user.username,
      title,
      desc
      }
    );
      window.location.reload();
    }catch(e){
      console.log(e);
    }
  }

  const PF="http://localhost:5000/images/";
  const sub=post.photo && post.photo.substr(13);

  return (
    <div className='single-post'>
        <div className="wrapper">
        {post.photo&&(

            <img
                src={PF+sub}
                className="wrapper-image"
                alt="wrapper"
            />
        )}
        {
          updateMode?(<input className="title-inp" value={title} onChange={(e)=>{setTitle(e.target.value)}} autoFocus/>)
          :(

            <h1 className="single-title">
            {post.title}
            {post.username===user?.username && (
            <div className="edit">
            <i className="icon fa-sharp fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true) }></i>
            <i className="icon fa-sharp fa-solid fa-trash" onClick={handleDelete}></i>
            </div>
            )}
            </h1>
          )
        }
            <div className="info">
            <span className="author">Author: 
            <Link to={`/?user=${post.username}`}className="link">
            <b>{post.username}</b>
            </Link>
             </span>
            <span className="date">{new Date(post.createdAt).toDateString()}</span>                
            </div>
            {updateMode?(<textarea className="desc-inp" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>):(
            <p className="desc">{post.desc}
            </p>
            )}
            {updateMode && (
            <button className="update-submit" onClick={handleUpdate}>Update</button>
            )}
        </div>
    </div>
  )
}

export default Singlepost