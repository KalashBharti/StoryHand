import React, { useState } from 'react'
import Alert from "./subComponent/Alert"
import Button from './subComponent/Button'
import { json, useNavigate } from 'react-router-dom';


export default function CreateAccount() {
    const [alert,setAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState(false);

    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [userName , setUserName] = useState("");
    const [name , setName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [otp, setOtp] = useState("");
    const handleSendMail = async()=>{
        console.log(email);
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!String(email).match(regex))
          {
           setAlert(true);
           setAlertMessage("Email is Invalid"); 
          }

          const body = JSON.stringify({email});
          await fetch("http://localhost:5000/user/register/sendOtp",{
            method:"POST",
            body : body,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin" : '*'
              }
          }).then((Response)=>{
            return Response.json();
          }).then((json)=>{
            setAlert(true);
           setAlertMessage(json.message); 
          })
        }
        
    const handleSubmit = async()=>{
        if(!email || !name || password1 !== password2 )
        {
            setAlert(true);
            setAlertMessage("Every Field is compulsory"); 
            return;
        }

        if(!otp)
        {
            setAlert(true);
            setAlertMessage("Insert OTP"); 
            return;
        }
        const body = JSON.stringify({userName,email, fullName:name,
        password: password1, otp});
        await fetch("http://localhost:5000/user/register",{
            method:"POST",
            body : body,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin" : '*'
              }
          }).then((Response)=>{
            if(Response.status === 201)
            {   
                navigate("/user/login");
            }
            setAlert(true);
            setAlertMessage("Check all the Input"); 

          })
    }
    return (
        <>
        {alert && <Alert message={alertMessage}  setActive={setAlert}/>}
        <div className="d-flex justify-content-center ">
      
        <div className='register'>
            <label className='d-flex mb-4 justify-content-center' style={{ fontSize: "2rem", color: "white" }}>
                Register Account
            </label>
            <div className='registerData'>
                <div className='h-auto'>
                    <div className="reg-data">
                        <label>Enter Username</label>
                        <div className="reg-input">
                            <input type="text" style={{width:"12rem"}} placeholder='example134' onInput={(e)=>setUserName(e.target.value)}/>
                            <i class="ri-checkbox-circle-fill"></i>
                            <Button message={"Check"} style={{borderRadius:"1rem",padding:".4rem", letterSpacing:".2rem"}}/>
                        </div>
                    </div>
                    <div className="reg-data">
                        <label>Enter full Name</label>
                        <div className="reg-input">
                            <input type="text" placeholder='Your full name' onInput={(e)=>setName(e.target.value)} />

                        </div>
                    </div>
                    <div className="reg-data">
                        <label>Enter Email</label>
                        <div className="reg-input">
                            <input type="email" placeholder='Your email id' onInput={(e)=>setEmail(e.target.value)}/>
                            <Button message={"send Otp"} click={handleSendMail}/>
                            <input type="number" placeholder='OTP' style={{width:"5rem",textAlign:"center"}} onInput={(e)=>setOtp(e.target.value)}/>

                        </div>
                    </div>
                    <div className="reg-data">
                        <label>Enter Password</label>
                        <div className="reg-input">
                            <input type="password" placeholder='Password'
                            onInput={(e)=>setPassword1(e.target.value)} 
                            />

                        </div>
                    </div>
                    <div className="reg-data">
                        <label>Enter Password</label>
                        <div className="reg-input">
                            <input type="text" placeholder='Confirm' 
                            onInput={(e)=>setPassword2(e.target.value)}
                            />

                        </div>
                    </div>
                </div>
                <Button message={"Create Account"} style={{borderRadius:"1rem"}} click={handleSubmit}/>
            </div>
        </div>      
        </div>
        </>
    )
}
