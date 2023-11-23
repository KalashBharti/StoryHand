import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Button from './Button'
import deleteImg from "../../image/delete.svg"
import DataContext from '../../context/DataContext'

export default function ParaGraph({data, index}) {

    const [chapter,setChapter] = useState("");
    const [text,setText] = useState("");

 

    useEffect(()=>{

        data[index] = {chapter,text};
    },[chapter,text])
   

    return (
        <div className='paragraph'>
            <form>
                <div className="d-flex ">
                    <div className="subject mb-3">
                        <div className="p-2"> <label >Caption :</label></div>
                        <div className="p-2">
                            <input type="text" name='topic' placeholder='Topic heading (optional)' onInput={(e)=>{setChapter(e.target.value)}} />
                        </div>
                    </div>
                    {/* <div className="ms-auto p-2"><img className='delete' src={deleteImg} alt="" style={{ height: "1.5rem" }} onClick={deleteElement} />
                </div> */}
                    {/* <div className="ms-auto p-2">
                        <img className='delete' src={require('../../image/delete.svg')} alt="" style={{ height: "1.5rem" }} data-index={"index"} />
                    </div> */}
                </div>

                <div className='data-box'>
                    <Button message={"Upload Img"} />
                </div>
                <div className="data-box">
                    <textarea rows={5} name="mess"  onInput={(e)=>setText(e.target.value)}/>
                </div>

                <div className="my-3 d-flex justify-content-center">
                  
                </div>
            </form >
        </div >

    )
}
