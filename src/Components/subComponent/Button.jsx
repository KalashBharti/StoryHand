import React from 'react'
// import plus from "../../image/icons/plus.png"
export default function Button({style,message,icon,click}) {
  return (
    <button onClick={click} className='primary-btn' style={style}>
      {icon &&  <img src={icon} alt="plus-math"/> }
           <label > {message}</label>
    </button>
  )
}
