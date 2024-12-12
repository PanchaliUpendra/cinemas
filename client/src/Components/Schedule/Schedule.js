import React, { useEffect, useRef, useState } from "react";
import './Schedule.css';
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../Docs/Data";
import { storeAllMoviesData } from "../../ReduxStates/Moviesdata";
import { storeAllTheatersData } from "../../ReduxStates/Theatersdata";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuidv4 } from 'uuid';

function Schedule(){
    const dispatch = useDispatch();
    const fetchCheckOnlyonce = useRef(false);
    const allMovies = useSelector((state)=>state.moviesdata.data);
    const allTheatersData = useSelector((state)=>state.theatersdata.data);
    const [showloading,setshowloading] = useState(false);
    const [scheduleData,setScheduleData] = useState({
        scheduleuid:'',
        moviename:'',
        movieuid:'',
        scheduletheater:'',
        theateruid:'',
        showtime:'',
        showdate:'',
        ticketcost:0,
        totaltickets:0,
    });

    async function handleCreateSchedule(e){
        e.preventDefault();
        setshowloading(true);
        try{
            // console.log(scheduleData);
            if(scheduleData.movieuid!=='' && scheduleData.moviename!=='' && scheduleData.theateruid!=='' && scheduleData.scheduletheater!=='' && scheduleData.showdate!=='' && scheduleData.showtime!=='' && scheduleData.ticketcost>0){
                const tempuid = uuidv4();
                const scheduleRes = await fetch(`${API_URL}/schedule/addmovieschedule`,{
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        ...scheduleData,
                        scheduleuid:tempuid
                    }),
                    credentials:'include'
                });

                const resData = await scheduleRes.json();
                if(resData.success){
                    alert('successfully added');
                    setScheduleData(prev=>({
                        ...prev,
                        scheduleuid:'',
                        moviename:'',
                        movieuid:'',
                        scheduletheater:'',
                        theateruid:'',
                        showtime:'',
                        showdate:'',
                        ticketcost:0,
                        totaltickets:0,
                    }));
                }else{
                    alert(resData.message);
                }

            }else{
                alert('please fill all required fields');
            }
        }catch(err){
            console.log('getting an error while creating the schedule',err);
            alert('getting an error while creating the schedule');
        }
        setshowloading(false);
    }

    useEffect(()=>{
        if(!fetchCheckOnlyonce.current){
            if(allMovies.length===0){         
                async function handleFetchMovies(){
                try{
                    const moviesRes = await fetch(`${API_URL}/movies/getmovies`,{
                        credentials:'include'
                    });
                    const resData = await moviesRes.json();
                        if(resData.success){
                            dispatch(storeAllMoviesData(resData.movies));
                        }
                }catch(err){
                    console.log('getting an error while fetching movies',err);
                }
            }
            handleFetchMovies();
            }

            if(allTheatersData.length===0){
                async function handleFetchTheaters(){
                    try{
                        const theaters = await fetch(`${API_URL}/theater/getTheaters`,{credentials:'include'});
                        const resData = await theaters.json();
                        if(resData.success){
                            dispatch(storeAllTheatersData(resData.alltheaters));
                        }
                    }catch(err){
                        console.log('getting an error while fetching theaters data',err);
                    }
                }
                handleFetchTheaters();
            }
            fetchCheckOnlyonce.current=true;
        }
    },[allMovies.length,allTheatersData.length,dispatch]);
    return(
        <>
            <Navbar/>
            <div className="homepage-con">
                {/* two blur images */}
                <div className="homepage-blur-img1"></div>
                <div className="homepage-blur-img2"></div>
                {/*create schedules */}
                <form className="schedule-create-form">
                    <h1>create a movie schedule</h1>
                    <div className="schedule-form-inner">
                        <div className="schedule-form-each">
                            <label>select movie</label>
                            <select value={scheduleData.movieuid} 
                            onChange={(e) => {
                                const selectedOption = allMovies.find(item => item.movieuid === e.target.value);
                                setScheduleData(prev => ({
                                    ...prev,
                                    movieuid:e.target.value,
                                    moviename: selectedOption.moviename ? selectedOption.moviename : ""
                                }));
                            }}>
                                <option value='' disabled>Select Movie</option>
                                {
                                    allMovies.map((item,idx)=>(
                                        <option value={item.movieuid} key={idx} 
                                        >{item.moviename}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="schedule-form-each">
                            <label>select theater</label>
                            <select value={scheduleData.theateruid} 
                            onChange={(e) => {
                                const selectedOption = allTheatersData.find(item => item.theateruid === e.target.value);
                                setScheduleData(prev => ({
                                    ...prev,
                                    theateruid: e.target.value,
                                    scheduletheater: selectedOption ? selectedOption.theatername : ""
                                }));
                            }}
                            >
                                <option value='' disabled>Select Theater</option>
                                {
                                    allTheatersData.map((item,idx)=>(
                                        <option value={item.theateruid} key={idx} onClick={()=>setScheduleData(prev=>({
                                            ...prev,
                                            scheduletheater:item.theatername
                                        }))}>{item.theatername}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="schedule-form-each">
                            <label>show date</label>
                            <input type='date' value={scheduleData.showdate} onChange={(e)=>setScheduleData(prev=>({
                                ...prev,
                                showdate:e.target.value
                            }))}/>
                        </div>
                        <div className="schedule-form-each">
                            <label>show time</label>
                            <input type='time' value={scheduleData.showtime} onChange={(e)=>setScheduleData(prev=>({
                                ...prev,
                                showtime:e.target.value
                            }))}/>
                        </div>
                        <div className="schedule-form-each">
                            <label>ticket cost</label>
                            <input type='number' placeholder="please Enter Ticket cost..." value={scheduleData.ticketcost} onChange={(e)=>setScheduleData(prev=>({
                                ...prev,
                                ticketcost:e.target.value
                            }))}/>
                        </div>
                        <div className="schedule-form-each">
                            <label>total tickets</label>
                            <input type='number' placeholder="please Enter Ticket cost..." value={scheduleData.totaltickets} onChange={(e)=>setScheduleData(prev=>({
                                ...prev,
                                totaltickets:e.target.value
                            }))}/>
                        </div>
                    </div>
                    <button className="schedule-submit-btn" onClick={(e)=>handleCreateSchedule(e)}>+ add schedule</button>
                </form>
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

export default Schedule; 