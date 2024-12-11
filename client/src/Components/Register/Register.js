import React, { useState } from "react";
import './Register.css';
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import logo from  "../../Assets/cinemalogo.png";
import Navbar from "../Navbar/Navbar";
import { API_URL } from "../../Docs/Data";
import { v4 as uuidv4 } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();   
    const [showloading,setshowloading] = useState(false);
    const [userDetails , setUserDetails] =useState({
        useruid:'',
        useremail:'',
        userphone:'',
        username:'',
        userpassword:'',
        userrole:'user',
        userconfirmpassword:''
    });

    async function handleRegisterUser(e){
        e.preventDefault();
        setshowloading(true);
        try{

            if(userDetails.username!=='' && userDetails.useremail!=='' && userDetails.userphone!==0 && userDetails.userpassword.length>0 && userDetails.userpassword===userDetails.userconfirmpassword){
                const tempuid = uuidv4();
                const response = await fetch(`${API_URL}/users/registeruser`,{
                    method:'POST',
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify({
                        ...userDetails,
                        useruid:tempuid,
                    }),
                    credentials:'include'
                });
                const resData = await response.json();
                if(resData.success){
                    alert(resData.message);
                    navigate('/login');

                }else{
                    alert(resData.message);
                }
            }else{
                alert('please fill all required fields also check password and confirm password');
            }
        }catch(err){
            console.log('getting an error while user registering ',err);
            alert(err);
        }
        setshowloading(false);
    }

    return (
        <>
            <Navbar/>
            <div className="signup-container">
                {/* Left section */}
                <div className="signup-left-section">
                    <div className="green-shade bottom-left"></div>
                    {/* <div className="signup-logo">
                        <img src={logo} alt="logo"/>
                    </div> */}
                    <div className="signup-welcome-text">
                        <h1> <i>Welcome. <br/> Begin your cinematic <br/>adventure now with <br/>our ticketing<br/> platform! </i></h1>
                    </div>
                </div>

                {/* Right section */}
                <div className="signup-right-section">
                    <div className="signup-form-container">
                        <h2>Create an account</h2>
                        <form>
                            <div className="signup-form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Enter your name" value={userDetails.username} onChange={(e)=>setUserDetails(prev=>({
                                    ...prev,
                                    username:e.target.value
                                }))}/>
                            </div>
                            <div className="signup-form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Enter your email" value={userDetails.useremail} onChange={(e)=>setUserDetails(prev=>({
                                    ...prev,
                                    useremail:e.target.value
                                }))}/>
                            </div>
                            <div className="signup-form-group">
                                <label>Mobile</label>
                                <input type='number' placeholder="Enter your mobile number" value={userDetails.userphone} onChange={(e)=>setUserDetails(prev=>({
                                    ...prev,
                                    userphone:e.target.value
                                }))}/>
                            </div>
                            <div className="signup-form-group">
                                <label>Password</label>
                                <div className="signup-password-container">
                                    <input type="password" placeholder="Enter your password"  value={userDetails.userpassword} onChange={(e)=>setUserDetails(prev=>({
                                    ...prev,
                                    userpassword:e.target.value
                                }))}/>
                                    <RemoveRedEyeOutlinedIcon className="signup-eye-icon" />
                                </div>
                            </div>
                            <div className="signup-form-group">
                                <div className="signup-password-container">
                                    <input type="password" placeholder="Confirm your password" value={userDetails.userconfirmpassword} onChange={(e)=>setUserDetails(prev=>({
                                        ...prev,
                                        userconfirmpassword:e.target.value
                                    }))}/>
                                    <RemoveRedEyeOutlinedIcon className="signup-eye-icon" />
                                </div>
                            </div>
                            <button className="signup-submit-btn" onClick={(e)=>handleRegisterUser(e)}>Create account</button>
                        </form>
                        <p className="signup-login-link">
                            Already Have An Account? <span>Log In</span>
                        </p>
                    </div>
                </div>
            </div>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={showloading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}
export default Register;