import React, { useCallback, useState } from 'react'
import like from '../../image/like.svg'
import comment from "../../image/commentsvg.svg"
import reportIcon from "../../image/report.svg"
import tempImg from "../../image/download.jpeg"
import Comment from './Comment'


export default function Blog({data , active}) {
  // console.log(data);

  // blog data
  // 1.data.like
  // 2.data.comments
  // 3.data.heading
  // 4.data.thumbnail
  // 5.data.para
  // 6.data.style
  // data.para

  const paras =data.para;
  const [showComment,setShowComment] = useState(false);
  // console.log(paras);
  return (
    <div>
      {showComment && <Comment chats={data.comments} active={setShowComment}/>}
    <div className='blog' style={{background:data.style.page?data.style.page:"#D9D9D9" ,color:data.style.text?data.style.text:"black"}}>
        <div className="section1">
            <div className="like-comment">
                <div className='like'>
                  <img src={like} alt="like img" />
                  <label>{data.like}</label>
                </div>
               <img src={comment} alt="" onClick={()=>{setShowComment(true)}} />
               <div className='close'>
                <img style={{cursor:"pointer"}} src="https://img.icons8.com/fluency/48/delete-sign.png" alt="Cross-sign" onClick={()=>{active(false)}}/>
                </div>
            </div>
            <div>

            </div>
        </div>
      <div className="content">
        <label className='heading'>{data.heading}</label>
        <div className='thumbnail'>
        <img src={data.thumbnail}  alt="" />
        </div>
        {
          
         
          paras.map((para)=>{
            return <div className="para">
            <label>{para.chapter}</label>
            {para.paraImg && <div className='para-img'>
            <img src={para.paraImg} alt="" />
        
            </div>}
            <p>{para.text}</p>
          </div>
            
          })
        }
       
       
     
      </div>
    </div>
    </div>
  )
}
