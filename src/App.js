import React, { useContext } from 'react'
import Topbar from './topbar/Topbar'
import Home from './pages/Home'
import Single from './pages/Single'
import Write from './pages/Write'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Context } from './context/Context'

const App = () => {
  const {user}=useContext(Context);
  return (
    <>
    <Router>
    <Topbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={user?<Home/>:<Register/>}/>
    <Route path="/login" element={user?<Home/>:<Login/>}/>
    <Route path="/write" element={user?<Write/>:<Login/>}/>
    <Route path="/post/:postId" element={<Single/>}/>
    <Route path="/settings" element={user?<Settings/>:<Login/>}/>
    </Routes>

    </Router>
    </>
  )
}

export default App