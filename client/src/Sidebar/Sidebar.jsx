import { useEffect, useState } from "react"
import axios from "axios"
import "./Sidebar.css"
import { Link } from "react-router-dom";


const Sidebar = () => {
  const [cat,setCats]= useState([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await axios.get("/cat");
        setCats(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    getCats();
  }, []);

  return (
    <div className="sidebar">
    <div className="sidebar-item">
      <span className="sidebar-title">ABOUT ME</span>
      <img
        src="https://media.licdn.com/dms/image/C4E03AQEFF1n8c_Sk_w/profile-displayphoto-shrink_400_400/0/1637732365436?e=1697068800&v=beta&t=aFw2onZ1TaCdXlMyikYKiqxXAkKGKs1_TIIHzjIFQAg"
        className="sidebar-profile"
        alt="sidebar-profile"
      />
      <p>
      Passionate engineering college student skilled in building modern 
      and dynamic websites using the MERN stack. I have a keen eye for design 
      and a strong foundation in web development.
      </p> 
    </div>
    <div className="sidebar-item">
    <span className="sidebar-title">CATEGORIES</span>
    <ul className="sidebar-list">
    {cat.map((c)=>{
    return <Link to={`/?cat=${c.name}`} className="link">
    <li className="sidebar-list-item">{c.name}</li>
    </Link>
    })}
    </ul>

    
    <div className="sidebar-item">
    <span className="sidebar-title">FOLLOW ME
    </span>
    <div className="sidebar-social">
        <i className="sidebar-icon fa-brands fa-square-facebook"></i>
        <i className="sidebar-icon fa-brands fa-square-twitter"></i>
        <i className="sidebar-icon fa-brands fa-square-pinterest"></i>
        <i className="sidebar-icon fa-brands fa-square-instagram"></i>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Sidebar