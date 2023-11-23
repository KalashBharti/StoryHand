import React, { useEffect, useState } from 'react'
import profile from "../../image/profile.png"
import tempImg from "../../image/download.jpeg"
import Button from './Button'
import likeImg from "../../image/like.svg"
import plusIcon from "../../image/icon _plus_.svg"
import commentImg from "../../image/commentsvg.svg"
export default function BlogCard({ data,darkTheme }) {
  
    console.log(data);

    return (
        <div className='blogcard'  >
            <div className='profile' >
                <img src={profile} alt="profile" />
                <div className="profileName" >
                    <label className='name'>Kalash Bharti</label>
                    <label className='userName'>@{data.userName}</label>
                </div>
                <div className='follow'>
                    <img src={plusIcon} alt="follow-sign" />
                    <label >Follow</label>
                </div>
            </div>
            <div className='contents'>
                <label className='subject'>{data.topic}: {data.heading}</label>
                <img src={tempImg} alt="" />
                <div className="para">

                    <label>{data.para[0].chapter}</label>
                    <br />
                    <label>{data.para[0].text.slice(0, 200)+"..."}</label>
                </div>
            </div>
            <Button message={"Read Full"} style={{ backgroundColor: "rgb(178 13 13)", borderWidth:".08rem", alignSelf: "flex-end" }} />
            <div className='like-comment'>
                <div className='like'>
                    <img src={likeImg} alt="like img" />
                    <label>{data.likes}</label>
                </div>
                <img src={commentImg} alt="" />
            </div>
        </div>
    )
}
