import React, { useRef, useState ,useEffect} from "react";
import './Navbar.css';
import Cinemalogo from '../../Assets/cinemalogo.png';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../Docs/Data";
import { clearStoredUserData, storeUserLoginDetails } from "../../ReduxStates/Usersdata";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Navbar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchCheckOnlyOnce = useRef(false);
    const isLoggedIn = useSelector((state)=>state.userdata.isLoggedIn);
    const [showloading,setShowloading] = useState(false);
    

    async function handleUserLogOut(){
        setShowloading(true);
        try{
            const response = await fetch(`${API_URL}/users/logout`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:'include'
            });
            const resData = await response.json();
            if(resData.success){
                dispatch(clearStoredUserData());
                alert(resData.message);
                navigate('/');
            }else{
                alert(resData.message);
            }
        }
        catch(err){
        }
        setShowloading(false);
    }

    useEffect(()=>{
        if(!fetchCheckOnlyOnce.current){
          async function handleFetchUserData(){
            try{
              const response = await fetch(`${API_URL}/users/checkauth`,{
                method:'GET',
                credentials:'include'
              });
              const resData = await response.json();
              if(resData.success){
                dispatch(storeUserLoginDetails({
                    isLoggedIn: true,
                    userrole:resData.user.userrole,
                    username:resData.user.username,
                    useremail:resData.user.useremail,
                    useruid:resData.user.useruid,
                    userphone:resData.user.userphone,
              }));
              }
            }catch(err){
              console.log('getting an error while fetching the users data',err);
            }
          }
          handleFetchUserData()
          fetchCheckOnlyOnce.current=true;
        }
      },[dispatch]);
    return(
        <>
            <div className="navbar-con">
                <div className="navbar-logo" onClick={()=>navigate('/')}>
                    <img src={Cinemalogo} alt='cinema logo' className="nav-cine-logo"/>
                </div>
                <div className="navbar-login">
                    {
                        isLoggedIn?<p onClick={()=>navigate('/mytickets')}>my tickets</p>:<p onClick={()=>navigate('/login')}>login</p>
                    }
                    
                    {
                        isLoggedIn?<p className="navbar-logout-btn" style={{background:'red',borderColor:'red'}} onClick={()=>handleUserLogOut()}>logout</p>:<p onClick={()=>navigate('/register')}>register</p>
                    }
                    
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

export default Navbar;