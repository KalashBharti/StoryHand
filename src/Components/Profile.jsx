import React, { useCallback, useEffect, useState } from 'react'
import img from '../image/coverImg.png'
import profile from '../image/download.jpeg'
import { useLocation, useParams } from 'react-router-dom';
import Alert from './subComponent/Alert';
export default function Profile({ darkTheme, user }) {
  const { name } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const location = useLocation();

  const getProfile = useCallback(async () => {

    const JsonBody = JSON.stringify({
      "userName":name,
    })
    
    await fetch("http://localhost:5000/user/profile", {
      method: "POST",
      body: JsonBody,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin" : '*'
      }
    }).then((response) => {
          
      if(response.status ===200)
      {
        return response.json();
      }   
    })
    .then((json) =>{ 
      if(json)
      {
        setUserProfile(json);
      }

    })
  }, []);
  useEffect(() => {
    
    getProfile();
  }, []);
  const [alert, setAlert] = useState(false);
  
  return (
    <div className='profile' style={{ color: darkTheme ? "white" : "black" }}>
     {alert && <Alert message={"nothing for now"} setActive={setAlert} />}
      <div className='user_profile_cover'>
        <img src={img} alt="" />
      </div>
      <div className="user_profile">
        <div className="profile_img">
          <img src={profile} alt="" />
          <label>{ "@"+userProfile.userName}</label>
        </div>
        <label className='profile_username'>{userProfile.name}</label>
      </div>
      <div className="profileInformation" >
        <div className='profile-info-data' style={{ backgroundColor: darkTheme ? "#030021" : "#D9D9D9" }}>
          <label className='info-title'>No. Posts</label>
          <label>{userProfile.post ? userProfile.post.length:0}</label>
        </div>
        <div className='profile-info-data' style={{ backgroundColor: darkTheme ? "#030021" : "#D9D9D9" }}>
          <label className='info-title'>Followers</label>
          <label>{userProfile.followersCount}</label>
        </div>
        <div className='profile-info-data' style={{ backgroundColor: darkTheme ? "#030021" : "#D9D9D9" }}>
          <label className='info-title'>Views Count</label>
          <label>{userProfile.viewCount}</label>
        </div>
        <div className='profile-info-data' style={{ backgroundColor: darkTheme ? "#030021" : "#D9D9D9" }}>
          <label className='info-title'>No. Posts</label>
          <label>23k</label>
        </div>
      </div>
      <div className='profile-Post-text'>Posts</div>
      <div className='blogs' style={{ backgroundColor: darkTheme ? "#030021" : "#D9D9D9" }}>
        {!userProfile.post? "No post yet":""}
      </div>
    </div>
  )
}
