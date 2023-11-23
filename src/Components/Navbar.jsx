import React, { useCallback, useEffect, useState ,user , setUser } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar({setTheme,darkTheme,token,user , setUser}) {
    
    const navigate = useNavigate();
    // const [user,setUser] = useState({});
    const handleTheme=useCallback(()=>{
        
        setTheme((e)=>{

            localStorage.setItem("theme",!e?"true":"false");

            return !e;
        });
    },[setTheme]);
    const checkToken = useCallback(async(primaryToken)=>{
        await fetch("http://localhost:5000/user/current/", {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization" : `Bearer ${primaryToken}` 
          }
        }).then((response) => {
          if(response.status === 200)
          {
            return response.json();
          }
          
          navigate("user/login/")
         
        }).then((json)=>{
          setUser(json);
        }).catch((e)=>{
          
        })
        
      },[])
    useEffect(()=>{
        const primaryToken = token || localStorage.getItem("token")

        if(primaryToken)
        {
            checkToken(primaryToken);
        }
    },[])
    
    return (
        <nav className="d-flex justify-content-between navbar">
            <div className='App-name'>
                <label onClick={()=>{navigate("/")}}><span style={{ color: "#ff5e5e" }}>story</span>Hand</label>
            </div>
            <div className='nav-categories'>
                <label >
                    Today-top
                </label>
                <div className='nav-drop-down'>
                    <label>

                        Categories<i className="ri-arrow-drop-down-line"></i>
                    </label>
                    <ul>
                        <li><label>Story</label></li>
                        <li><label>Blog</label></li>
                        <li><label>Technology</label></li>
                        <li><label>Thought</label></li>
                        <li><label>Podcast</label></li>

                    </ul>

                </div>
                <label >
                    News
                </label>

                <div className="theme" onClick={handleTheme}>

                {darkTheme? <img src="https://img.icons8.com/ios-filled/50/ffffff/bright-moon.png" alt="bright-moon"/>:<img src="https://img.icons8.com/ios-filled/50/ffffff/sun--v1.png" alt="sun--v1"/>}
               
                
                </div>


            </div>
            <div className='nav-sign nav-drop-down'>
                <label className='nav-profile '>
                    <i className="ri-user-fill"></i>
                   {" "+( user&&user.name)}
                </label>
                <ul>
                    <li onClick={()=>{navigate("/profile/"+ user.userName)}}>Profile</li>
                    <li>Source Code</li>
                    <li>Log Out</li>
                </ul>
            </div>
        </nav>
    )
}
