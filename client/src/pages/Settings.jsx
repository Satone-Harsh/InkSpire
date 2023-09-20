import "./Settings.css"
import Sidebar from "../Sidebar/Sidebar"
import { useContext, useState } from "react"
import {Context} from "../context/Context"
import axios from "axios"
import defaultImage from "../topbar/img_avatar.png";


export default function Settings() {
  const PF ="http://localhost:5000/images/";
  const {user, dispatch}=useContext(Context);
  const [file,setFile]= useState(null);
  const [username,setUsername]= useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [sucess,setSucess]= useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    dispatch({type: "UPDATE_START"});
    const updatedUser={
      userId:user._id,
      username,
      email,
      password
    };
    if(file){
      const data=new FormData();
      const filename =Date.now()+file.name;
      data.append("name",file.name);
      data.append("file",file);
      updatedUser.profilePic=filename.substr(13);
      try{
       await axios.post("./upload",data);
       console.log(PF+filename.substr(13));
      }catch(err){
        console.log("image err "+err);
      }
    }
    try{
      console.log(user._id);
      const res=await axios.put("/user/"+user._id,updatedUser);
      setSucess(true);
      dispatch({type: "UPDATE_SUCESS",payload:res.data});

      }catch(e){
      console.log(e);
      dispatch({type: "UPDATE_FAILURE"});
    }
  }
  return (
    <div className="settings">
        <div className="wrapper">
            <div className="title">
            <span className="update-title">Update your account</span>
            <span className="delete-title">Delete account</span>
            </div>
            <form className="settings-form" onSubmit={handleSubmit}>
                <label>Profile picture</label>
                <div className="profile">
                    <img
                    className="settings-image"
                    src={file? URL.createObjectURL(file) : PF+user.profilePic}
                    />
                    <label htmlFor="fileInput">
                    <i class="profile-icon fa-regular fa-circle-user"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)}/>
                
                <label>Email</label>
                <input type="Email" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}/>
                
                <label>Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                
                <button className="submit" type="submit">Update</button>
                {sucess && <span style={{color:"green"}}>Profile has been Updated ✅</span>}
            </form>
        </div>
        <Sidebar/>
    </div>
  );
}
