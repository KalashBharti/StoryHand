import React, { useCallback, useEffect, useRef, useState } from 'react'

import tempImg from "../image/download.jpeg"
import Button from './subComponent/Button'
import BlogCard from './subComponent/BlogCard'
import { useNavigate } from 'react-router-dom';

// const chats = [{uername: "@kalashbharti",name :"Kalash Bharti",message:"kya mast hai bhai"},{uername: "@abcdefg1",name :"ABCDE",message:"djkskjfh sdjhf ddhf "},{uername: "@abcdefg2",name :"ABCDE",message:"djkskjfh sdjhf ddhf "},{uername: "@abcdefg3",name :"ABCDE",message:"djkskjfh sdjhf ddhf "},{uername: "@abcdefg4",name :"ABCDE",message:"djkskjfh sdjhfdjkskjfh sdjhfdjkskjfh sdjhfdjkskjfh sdjhfdjkskjfh sdjhfdjkskjfh sdjhfdjkskjfh sdjhfdjkskjfh sdjhf ddhf "}];

// const para= {chapter:"About Ai",paraImg:tempImg,text:"lorem lorem loermkldglkdjfglkdfjglkdfjglkdfjglkdjfglkdjfglkjdflgkjdlfkgjldkfgjldkfgjlkdfjgldkjfglkdfjglkjdflgkj"};

// const blog={blog_id:"bfjs124231", username:"@kalashbharti",thumbnail:tempImg,topic:"thought", heading:"Ai is far more dangerous", like:12 ,comments:chats,para:[para,para]};

export default function Home({ darkTheme, setUser, setBlogData, setShowBlog }) {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const checkToken = useCallback(async (token) => {
    await fetch("http://localhost:5000/user/current/", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }

      navigate("user/login/")

    }).then((json) => {
      
      setUser(json);
    }).catch((e) => {
      navigate("user/login/");
    })

  }, [])
  
  const fetchPost = ()=>{
    // console.log(localStorage.getItem("token"));
    fetch("http://localhost:5000/post/all",{
      method : "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization" : `Bearer ${localStorage.getItem("token")}` 
      }
    }).then((res)=>{
      if(res.status === 200)
      {
        return res.json();
      }
      else{
        // console.log(res,localStorage.getItem("token"));
        alert("something went wrong")
      }
    }).then((json)=>{
      // console.log(json);
      setData(json);
    })
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken)
      navigate("/user/login");
    checkToken(storedToken);
    setToken(storedToken);
    fetchPost();
  }, [checkToken])


  

  return (
    <div className='home'>

      <div className="section1" style={{ color: darkTheme ? "white" : "black", borderColor: darkTheme ? "white" : "black" }}>
        <div className='home-post'>
          <Button message={"Post"} style={{ backgroundColor: "#B97537", padding: ".4rem", letterSpacing: ".2rem" }} click={() => { navigate("/post/addPost") }} />
          <label >Post Something on community</label>
        </div>
      </div>
      <div className='blogs' style={{ backgroundColor: darkTheme ? "#030021" : "#D9D9D9" }}>
       {data.map((e,i)=>{
        //  console.log(e);
       return <BlogCard darkTheme={darkTheme} data={e}/>
       })}
      </div>

    </div>
  )
}
