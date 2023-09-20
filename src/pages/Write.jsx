import { useContext, useState } from "react"
import "./Write.css"
import axios from "axios"
import { Context } from "../../src/context/Context";


export default function Write() {
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [file,setFile]=useState(null);
  const {user}=useContext(Context);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newPost={
      username:user.username,
      title,
      desc
    };
    if(file){
      const data=new FormData();
      const filename =Date.now()+file.name;
      data.append("name",file.name);
      data.append("file",file);
      newPost.photo=filename;
      try{
       await axios.post("./upload",data);
      }catch(err){
        console.log(err);
      }
    }
    try{
      const res=await axios.post("/post",newPost);
      console.log(res.data)
      window.location.replace("/post/"+res.data._id);
    }catch(e){
      console.log(e);
    }
  }
  return (
    <div className="write">
    {file&&
        <img
        src={URL.createObjectURL(file)}
        alt="Mountains-inspiarations"
        className="write-image"/>
    }
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="file-input">
                <i className="add-icon fa-solid fa-plus"></i>
                </label>
                <input type="file" id="file-input" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                <input type="text" placeholder="Title" autoFocus={true} className="write-input" onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
                <textarea placeholder="Tell your story..." type="text" className="write-input write-text" onChange={(e)=>setDesc(e.target.value)}></textarea>
            </div>
            <button className="write-submit" type="submit">Publish</button>
        </form>
    </div>
  )
}
