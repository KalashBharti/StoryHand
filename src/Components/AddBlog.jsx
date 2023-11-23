import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Button from './subComponent/Button'
import uploadImg from "../image/upload_.svg"
import tempImg from "../image/download.jpeg"

import ParaGraph from './subComponent/ParaGraph';
import Blog from './subComponent/Blog';
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
export default function AddBlog({setAlert,alertMsg}) {

  //Blog infos
  const [topic,setTopic] = useState("thought");
  const [pageColor,setPageColor] = useState("white");
  const [textColor,setTextColor] = useState("black");
  const [heading,setHeading] = useState("");

  const navigate = useNavigate();
  //blogs
  const [blog,setBlog] = useState({});
  const [previewBlog,setPreviewBlog] = useState(false);
  //data
  const data = useRef([]);
  //para component
  const [paras,setParas] = useState([]);
 // blog data

  // 1.data.like
  // 2.data.comments
  // 3.data.heading
  // 4.data.thumbnail
  // 5.data.para
  // 6.data.style

  const addPara = ()=>{
    const temp = [...paras, <ParaGraph data={data.current} index={paras.length}/>];
    setParas(temp);
  }

  const convertToBlog =()=>{
    let paraList=[];
    if(data.current.length !==0){
      data.current.forEach((e)=>{
        paraList.push(e);
      })
    }
      
    // console.log(pageColor,textColor);
    const temp = JSON.stringify({para:paraList,topic:topic, heading,
      style:{page:pageColor,text:textColor}})
    
    setBlog(temp);
  };

  useEffect(()=>{
    
    convertToBlog();

  },[topic,heading,pageColor,paras])
  const handleBlogPreview = ()=>{
    
    // convertToBlog();
    setPreviewBlog(true);

  }

    const handleSave =()=>{
      convertToBlog();
    console.log(blog);
  }
    const handleSubmit = async()=>{
      convertToBlog();
      
      // const uploadBody = JSON.stringify(blog);
      fetch("http://localhost:5000/post/upload",{
        method : "POST",
        body:blog,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization" : `Bearer ${localStorage.getItem("token")}` 
        }
      }).then((response)=>{
        if(response.status === 201)
        {
          alertMsg("Post uploaded")
          setAlert(true);
          navigate("/")
        }
        else{

          alertMsg("Something went wrong")
          setAlert(true);
        }
        // console.log(response,localStorage.getItem("token"));
      }).then((json)=>{
        console.log(json);
      })
    
  }
 
  return (
    <>
      {previewBlog && <Blog data={blog} active={setPreviewBlog}/>}
      <div className='addblog'>
        <div className="previvewBtn">
          <Button message={"Preview Card"} style={{ backgroundColor: "#7E0000" }} />
          <Button message={"Preview Blog"} style={{ backgroundColor: "#7E0000" }}  click={handleBlogPreview}/>
        </div>
        <div className="blog-data">

          {/* choose topics */}
          <div className="data-box">
            <label>Topic:</label>
              <select onChange={(e)=>setTopic(e.target.value)}>
                <option value={"thought"} selected >Thought</option>
                <option value={"Story"}>Story</option>
                <option value={"Concept"}>Concept</option>
                <option value={"Technology"}>Technology</option>
                <option value={"News"}>News</option>
              </select>
            </div>
        
          {/* Subject Input */}
          <div className='subject'>

            <div className='data-box'>
              <label >Caption :</label>
              <input type="text" onInput={(e)=>setHeading(e.target.value)}/>
            </div>
            <h6>Subject must be less then 100 letters</h6>
          </div>

          {/* Add thumbnail */}
          <div className='data-box'>
            <label>Thumbnail :</label>
            <Button message={"Upload"} icon={uploadImg} />
          </div>

          {/* preview Thumbnail */}
          <div className="data-box">
            <img className='prev-img' src={tempImg} alt="" />
          </div>

          {/* page color selection  */}
          <div className='data-box'>
            <label>Paper color :</label>
            <select onChange={(e)=>setPageColor(e.target.value)}>
                <option value={"white"} selected>Normal-white</option>
                <option value={"black"}>Dark</option>
                <option value={"#f8dcc4"}>Old page</option>
                <option value={"#0b00d0"}>Fantacy Blue</option>
                <option value={"#6e0000"}>HeadLine Red</option>
              </select>
          </div>

          {/* text color selection */}
          <div className='data-box'>
            <label>Text color :</label>
            <select onChange={(e)=>setTextColor(e.target.value)}>
                <option value={"black"} selected>Black</option>
                <option value={"white"}>White</option>
                <option value={"blue"}>Blue</option>
                <option value={"red"}>Red</option>
              </select>
          </div>

          {/* text-color preview */}
          <div className="data-box">
            <label > Preview Text :</label>
            <label style={{ backgroundColor:pageColor?pageColor:"white", color:textColor?textColor:"black", padding: ".2rem" }}>Example Text</label>
          </div>

          {/* blog contents */}
          <div className="data-box">
            <label>Describe  :-</label>
          </div>

          {/* blog para */}
          <div className="para">

           {paras.map((ele,idx)=>{
            return ele;
           })}

           
          <Button message={"Add Paragraph"} click={addPara} />
          </div>

          <Button message={"Save"} style={{
            alignSelf: "center"
          }} 
          click={handleSave}/>
          <Button message={"Submit Blog"} style={{
            alignSelf: "center"
          }} 
          click={handleSubmit}/>
        </div>
      </div>
    </>
  )
}
