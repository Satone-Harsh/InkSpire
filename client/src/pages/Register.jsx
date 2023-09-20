import { Link } from "react-router-dom"
import "./Register.css"
import { useState } from "react"
import axios from "axios"

export default function Register() {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(false);

  const handleSubmit= async(e)=>{
  e.preventDefault();
    try{
      const res=await axios.post("/auth/register",{
        username,
        email,
        password
      });
      console.log(res);
      res.data && window.location.replace("/login");
    }catch(e){
      setError(true);
    }
  }

  return (
    <div className="registerr">
    <span className="register-title">Register</span>
        <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" onChange={e=>setUsername(e.target.value)} placeholder="Enter Username"/>
        <input type="email" onChange={e=>setEmail(e.target.value)} placeholder="Enter your email.."/>
            <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Enter your password.."/>
            <button className="register-button" type="submit">Register</button>
            <button className="r-login-button">
            <Link to="/login" className="link">Login</Link>
            </button>
            {error && <span style={{color:"white", marginTop:"15px", textAlign:"center"}}>Something is wrong!!!</span>}
        </form>
    </div>
  )
}
