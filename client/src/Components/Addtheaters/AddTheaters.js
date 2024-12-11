import React, { useEffect, useState } from "react";
import './AddTheaters.css';
import Navbar from "../Navbar/Navbar";
import { API_URL } from "../../Docs/Data";
import { v4 as uuidv4 } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Addtheaters(){
    const [showloading,setshowloading] = useState(false);
    const [allTheaters , setAllTheaters] = useState([]);
    const [theaterData, setTheaterData] = useState({
        theateruid:'',
        theatername:'',
        theartershows:0,
        theateraddress:'',
        theaterseats:0
    });

    async function letsAddTheater(e){
        e.preventDefault();
        setshowloading(true);
        try{
            if(theaterData.theatername!=='' && theaterData.theaterseats!=='' && theaterData.theartershows!=='' && theaterData.theateraddress!==''){
                const tempuid = uuidv4();
                const addres = await fetch(`${API_URL}/theater/addtheater`,{
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        ...theaterData,
                        theateruid:tempuid,
                    }),
                    credentials:'include'
                });
                const resData = await addres.json();
                if(resData.success){
                    setAllTheaters(prev=>([...prev,theaterData]));
                    alert(`${resData.message}`);
                    setTheaterData(prev=>({
                        ...prev,
                        theateruid:'',
                        theatername:'',
                        theartershows:0,
                        theateraddress:'',
                        theaterseats:0
                    }));
                }else{
                    alert(`${resData.message}`);
                }
            }else{
                alert('please fill all required fields');
            }
        }catch(err){
            console.log('getting an error while adding the theater');
            alert('getting an error while adding the theater');
        }
        setshowloading(false);
    }

    useEffect(()=>{
        async function fetchTheatersData(){
            const temptheaters = await fetch(`${API_URL}/theater/getTheaters`,{credentials:'include'});
            const responseData = await temptheaters.json();
            if(responseData.success){
                setAllTheaters(responseData.alltheaters);
            }
        }
        fetchTheatersData();
    },[]);
    return(
        <>
            <Navbar/>
            <div className="homepage-con">
                {/* two blur images */}
                <div className="homepage-blur-img1"></div>
                <div className="homepage-blur-img2"></div>

                {/* add movies */}
                <h1 className='addtheater-header'>add Theaters</h1>
                <form className="addtheater-form">
                    <div className="addtheater-all-fileds">
                        <div className="addtheater-each-field">
                            <label>theater name*</label>
                            <input type='text' placeholder="Enter Theater name" value={theaterData.theatername} onChange={(e)=>setTheaterData(prev=>({
                                ...prev,
                                theatername:e.target.value
                            }))}/>
                        </div>
                        <div className="addtheater-each-field">
                            <label>theater seats*</label>
                            <input type='number' placeholder="Enter Theater Seats" value={theaterData.theaterseats} onChange={(e)=>setTheaterData(prev=>({
                                ...prev,
                                theaterseats:e.target.value
                            }))}/>
                        </div>
                        <div className="addtheater-each-field">
                            <label>theater shows*</label>
                            <input type='number' placeholder="Enter Theater Shows" value={theaterData.theartershows} onChange={(e)=>setTheaterData(prev=>({
                                ...prev,
                                theartershows:e.target.value
                            }))}/>
                        </div>
                        <div className="addtheater-each-field">
                            <label>theater city*</label>
                            <input type='text' placeholder="Enter Theater city" value={theaterData.theateraddress} onChange={(e)=>setTheaterData(prev=>({
                                ...prev,
                                theateraddress:e.target.value
                            }))}/>
                        </div>
                    </div>
                    <button onClick={(e)=>letsAddTheater(e)} style={{background:'blue',color:'white'}}>+ add theater</button>
                </form>

                {/* all theaters */}
                <h2 className="addtheaters-added-theaters-header">All Theater</h2>
                <div className="addtheaters-all-theaters">
                    {
                        allTheaters.length>0 && allTheaters.map((temptheater,idx)=>(
                            <div className="addtheaters-each-theater" key={idx}>
                                <div className="addtheaters-each-theater-div">
                                    <p>theater name</p>
                                    <h2>{temptheater.theatername}</h2>
                                </div>
                                <div>
                                    <div className="addtheaters-each-theater-div">
                                        <p>total shows</p>
                                        <h2>{temptheater.theartershows}</h2>
                                    </div>
                                    <div className="addtheaters-each-theater-div">
                                        <p>total seats</p>
                                        <h2>{temptheater.theaterseats}</h2>
                                    </div>
                                </div>

                                <div className="addtheaters-each-theater-div">
                                    <p>theater city</p>
                                    <h2>{temptheater.theateraddress}</h2>
                                </div>
                            </div>
                        ))
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

export default Addtheaters;