import { Link } from "react-router-dom"
import "./Login.css"
import { useContext, useRef, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios"

export default function Login() {
  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching} =useContext(Context);
  const [sucess,setSucess]=useState(true);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const res=await axios.post("/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({type:"LOGIN_SUCESS",payload:res.data});
    }catch(err){
      setSucess(false);
      console.log(err);
      dispatch({type:"LOGIN_FAILURE"});
    }
  };

  return (
    <div className="loginn">
    <span className="login-title">Login</span>
        <form className="login-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your username.." ref={userRef}/>
            <input type="password" placeholder="Enter your password.." ref={passwordRef}/>
            <button className="login-button" disabled={isFetching}>Login</button>
            <button className="l-register-button">
            <Link to="/register" className="link">Register</Link>
            </button>
            {sucess || (<span className="login-succ">Invalid Credentials⚠️</span>)}
        </form>
    </div>
  )
}
