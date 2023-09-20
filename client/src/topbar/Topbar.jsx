import { Link } from "react-router-dom";
import "./Topbar.css"
import React, { useContext } from 'react'
import { Context } from "../context/Context";

const Topbar = () => {
  const PF ="http://localhost:5000/images/";
  const {user,dispatch}=useContext(Context);

  const handleLogout=()=>{
    dispatch({type:"LOGOUT"});
  }
  
  return (
    <div className='top'>
        <div className="top-left">
        <i className="top-icon fa-brands fa-square-facebook"></i>
        <i className="top-icon fa-brands fa-square-twitter"></i>
        <i className="top-icon fa-brands fa-square-pinterest"></i>
        <i className="top-icon fa-brands fa-square-instagram"></i>
        </div>
        <div className="top-centre">
            <ul className="top-list">
            <li className="top-list-item">
            <Link to="/" className="link">HOME</Link>
            </li>
            <li className="top-list-item"><Link to="/" className="link">ABOUT</Link></li>
            <li className="top-list-item"><Link to="/" className="link">CONTACT</Link></li>
            <li className="top-list-item"><Link to="/write" className="link">WRITE</Link></li>
            <li className="top-list-item"><Link to="/" className="link" onClick={handleLogout}>{user&&"LOGOUT"}</Link></li>
            </ul>
        </div>
        <div className="top-right">
        
        {
          user?(
            <Link to="/settings">
        <img className="top-image"
            src={PF+user.profilePic}
        />
            </Link>
          ):(
            <>
            <Link to="/login" className="link top-list-item">LOGIN</Link>
            <Link to="/register" className="link top-list-item">REGISTER</Link>
            </>
          )
        }
        <i className="top-search-icon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}

export default Topbar