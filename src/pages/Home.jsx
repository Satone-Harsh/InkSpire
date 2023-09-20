import "./Home.css"
import Header from '../Header/Header'
import Posts from '../posts/Posts'
import Sidebar from '../Sidebar/Sidebar'
import { useEffect, useState } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts,setPosts]=useState([]);
  const {search} =useLocation();

  console.log(search);

  useEffect(()=>{
    const fetch= async()=>{
      const res= await axios.get("/post/"+search);
      setPosts(res.data);
    }
    fetch();
  },[search]);

  return (
    <div>
    <Header/>
    <div className='home'>
      <Posts posts={posts}/>
      <Sidebar/>
    </div>
    </div>
  )
}

export default Home