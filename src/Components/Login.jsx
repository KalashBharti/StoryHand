import React, { useCallback, useState } from 'react'
import img from "../image/download.jpeg"
import Button from './subComponent/Button';
import { useNavigate } from 'react-router-dom';
import Alert from './subComponent/Alert';

export default function Login({setToken}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert,setAlert] = useState(false);
  const [alertMessage,setAlertMessage] = useState("");
  const navigate = useNavigate();

  const loginHandler =  useCallback( async()=>{

    const loginDetail = JSON.stringify({
      "email":email,
      "password":password
    })
   
    await fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: loginDetail,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin" : '*'
      }
    }).then((response) => {
          
      if(response.status ===200)
      {
        return response.json();
      }else
     {
        setAlertMessage("Email or password is wrong");
        setAlert(true);
      }      
    })
    .then((json) =>{ 
      if(json)
      {
        const token = json.accessToken
        setToken(token);
        localStorage.setItem("token",token);
        navigate('/');
      }

    }).catch((error)=>{
      setAlertMessage(error.message);
      setAlert(true);
    });

 
  },[email,password])
  return (
    <>
      {alert&& <Alert setActive={setAlert} message={alertMessage}/>}
    <div className='login'>
      <form >

        <div className="login-profile">
            <img src={img} alt="" />
        </div>
        <label className='mt-5 sign-in'>Sign In</label>

        <input type="text" autoComplete="false" placeholder='Enter Email' onInput={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" autoComplete='false' placeholder='Enter Password' onInput={(e)=>{setPassword(e.target.value)}}/>

      </form>
        <Button message={"LOGIN"} click={loginHandler}/>
      
        <label className='mt-5 registerLabel' onClick={()=>{navigate("/user/register")}}>Create Account </label>

    </div>
    </>
  )
}
