import React, { useCallback, useRef } from 'react'
import likeSvg from '../../image/like.svg'
import Chat from './Chat'
import Button from './Button';
import plusIcon from "../../image/icon _plus_.svg"
export default function Comment({darkTheme,chats,active}) {
  // console.log(chats);
  const handleActive = useCallback(()=>{
  active(false);
  },[active])


  return (
    <div className={darkTheme?'comment elementDark':"comment"} >
      <div className="section1" style={{color:darkTheme?'white':'black', borderColor:darkTheme?"white":"black"}}>
        <div className='likes'>
        <img src={likeSvg} alt="like img" />
        <label>100k</label>

        </div>
        <div className="cancel">
        <img  width="100" height="100" src="https://img.icons8.com/fluency/100/delete-sign.png" alt="cancel-sign" onClick={handleActive}/>

        </div>
      </div>
      <div className="section2" style={{color:darkTheme?'white':'black'}}>
        <label>Comments</label>
      </div>
      <div className="chatting">
       {chats.map((e)=> {
    return <Chat  key={e.username} darkTheme={darkTheme} message={e}/>
})}
           
          
      </div>
      <div className='btn'>
      <textarea  type="text"  />
        <Button message={"Add comment"} icon={plusIcon}/>
      </div>
    </div>
  )
}
