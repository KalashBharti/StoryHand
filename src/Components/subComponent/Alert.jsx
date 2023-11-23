import React, { useEffect } from 'react'

export default function Alert({message,active,setActive}) {
    useEffect(()=>{
        setTimeout(() => {
            setActive(false);
        }, 3000);
    },[setActive]);
  return (

    <div>
      <div className="alert">
        <label> {message}</label>
     </div>
    </div>
  )
}
