import React, { useCallback, useRef } from 'react'
import profile from '../../image/profile.png'
import { useNavigate } from 'react-router-dom'
import deleteIcon from "../../image/delete.svg"
export default function Chat({message,darkTheme,key}) {
  
    console.log(message);
    const navigator = useNavigate();


    const openProfileHandler = useCallback(()=>{
      let url = "profile/";
        navigator(url.concat("bharti") ,{state:{dark:true}});
    },[navigator])
  return (
    <div className="chat">
      <div className='profile' onClick={openProfileHandler}>
        <img src={profile} alt="profile" />
        <div className="profileName" style={{color:darkTheme?"white":"black"}}>
            <label className='Name'>{message.name}</label>
            <label className='userName'>{message.uername}</label>
        </div>
      </div>
      <div className='message'>
        <label >{message.message}</label>
      
      </div>
      <img className='deleteIcon' src={deleteIcon} alt="delete icon" />
    </div>
  )
}
