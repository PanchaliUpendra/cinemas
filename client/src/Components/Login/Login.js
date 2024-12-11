import React, { useState } from "react";
import './Login.css';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Navbar from "../Navbar/Navbar";
import { API_URL } from "../../Docs/Data";
import { useDispatch } from "react-redux";
import { storeUserLoginDetails } from "../../ReduxStates/Usersdata";
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showloading,setshowloading] = useState(false);
    const [userdetails ,setUserdetails] = useState({
        useremail:'',
        userpassword:''
    });

    async function handleUserLogin(e){
        e.preventDefault();
        setshowloading(true);
        try{
            if(userdetails.useremail!=='' && userdetails.userpassword!==''){
                const loginres = await fetch(`${API_URL}/users/login`,{
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(userdetails),
                    credentials:'include'
                });
                const resData = await loginres.json();
                if(resData.success){
                    dispatch(storeUserLoginDetails({
                        ...resData.user,
                        isLoggedIn: true,
                        userrole:resData.user.userrole,
                        username:resData.user.username,
                        useremail:resData.user.useremail,
                        useruid:resData.user.useruid,
                        userphone:resData.user.userphone,
                    }));
                    alert(resData.message);
                    navigate('/');
                }else{
                    alert(resData.message);
                }
            }else{
                alert('please fill all required fields ');
            }
        }catch(err){
            console.log('getting error while login',err);
            alert(err);
        }
        setshowloading(false);

    }

    return (
        <>
            <Navbar/>
            <div className="login-maincon">
                <div className="green-shade top-right"></div>
                <div className="green-shade bottom-left"></div>

                <div className="login-container">
                    <form className="login-form">
                        <h2>Login to your account</h2>
                        <div className="login-form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" value={userdetails.useremail} onChange={(e)=>setUserdetails(prev=>({
                                ...prev,
                                useremail:e.target.value
                            }))}/>
                        </div>
                        <div className="login-form-group">
                            <label htmlFor="password">Password</label>
                            <div className="login-password-container">
                                <input type="password" id="password" placeholder="Enter your password" value={userdetails.userpassword} onChange={(e)=>setUserdetails(prev=>({
                                ...prev,
                                userpassword:e.target.value
                            }))}/>
                                <button type="button" className="login-password">
                                    <RemoveRedEyeOutlinedIcon />
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="login-btn" onClick={(e)=>handleUserLogin(e)}>Login now</button>
                        <p className="login-register-link">
                            Don’t Have An Account? <span>Register Here</span>
                        </p>
                    </form>
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

export default Login;