import React, { useEffect , useRef, useState} from "react";
import './Eachmovie.css';
import Navbar from "../Navbar/Navbar";
// import Movieposter from '../../Assets/salaar.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { API_URL, Shows } from "../../Docs/Data";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeAllTheatersData } from "../../ReduxStates/Theatersdata";
import { v4 as uuidv4 } from 'uuid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Eachmovie(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {movieid} = useParams();
    const fetchCheckOnlyOnce = useRef(false);
    const allTheatersData = useSelector((state)=>state.theatersdata.data);
    const isLoggedIn = useSelector((state)=>state.userdata.isLoggedIn);
    const useruid = useSelector((state)=>state.userdata.useruid);
    const username = useSelector((state)=>state.userdata.username);
    const useremail = useSelector((state)=>state.userdata.useremail);
    const [showloading,setshowloading] = useState(false);
    const [nextDates,setNextDates] = useState([]);
    const [bookingDetails,setBookingDetails] = useState({
        userid:'',
        bookinguid:'',
        moviename:'',
        theatername:'',
        theateruid:'',
        movieimgurl:'',
        movieuid:'',
        ticketcost:0,
        totaltickets:1,
        date:'',
        starttime:'',
        endtime:'',
        moviedes:'',
        moviedur:0,
        movietype:'',
        useremail:'',
        username:''
    });

    async function handleBookNewTickets(e){
        e.preventDefault();
        setshowloading(true);
        try{
            const tempbookid = uuidv4();
            const bookres = await fetch(`${API_URL}/bookings/booktickets`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    ...bookingDetails,
                    bookinguid:tempbookid,
                    userid:useruid,
                    useremail:useremail,
                    username:username
                }),
                credentials:'include'
            });
            const resData = await bookres.json();
            if(resData.success){
                alert(resData.message);
                setBookingDetails((prev=>({
                    ...prev,
                    theatername:'',
                    theateruid:'',
                    moviename:'',
                    movieuid:'',
                    starttime:'',
                    endtime:'',
                    date:''
                })));
            }else{
                alert(resData.message);
            }
        }catch(err){
            console.log('getting an erro while bookings');
            alert(err);
        }
        setshowloading(false);
    }

    
    useEffect(()=>{
            async function fetchEachMovieData(){
                try{
                    const movieres = await  fetch(`${API_URL}/movies/geteachmovie/${movieid}`,{
                        credentials:'include'
                    });
                    const resData = await movieres.json();
                    console.log('movie data',resData);
                    if(resData.success){

                        setBookingDetails(prev=>({
                            ...prev,
                            moviename:resData.movie.moviename,
                            movieuid:resData.movie.movieuid,
                            ticketcost:resData.movie.movietktcost,
                            moviedes:resData.movie.moviedes,
                            moviedur:resData.movie.moviedur,
                            movietype:resData.movie.movietype,
                            movieimgurl:resData.movie.movieimgurl
                        }));
                    }
                }catch(err){
                    console.log('getting an error while fewtching the movie data',err);
                }
            }
            fetchEachMovieData();
        const generateNextFiveDays = () => {
            const startDate = new Date();
            const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
            const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        
            const result = [];
        
            for (let i = 0; i < 5; i++) {
                const currentDate = new Date(startDate); // Copy the start date
                currentDate.setDate(startDate.getDate() + i); // Increment by i days
        
                result.push({
                    wholedate: currentDate.toISOString().split('T')[0],
                    day: days[currentDate.getDay()],
                    date: currentDate.getDate(),
                    month: months[currentDate.getMonth()],
                    year: currentDate.getFullYear(),
                });
            }
        
            setNextDates(result);
        };
        generateNextFiveDays();//generating next five days
        if(!fetchCheckOnlyOnce.current){

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
            
            fetchCheckOnlyOnce.current=true;
        }
        

    },[allTheatersData.length,dispatch ,movieid]);
    return(
        <>
            <Navbar/>
            <div className="homepage-con">
                {/* two blur images */}
                <div className="homepage-blur-img1"></div>
                <div className="homepage-blur-img2"></div>
                {/* theaters , dates and times */}
                <div className="eachmovie-first-container">
                    <div className="eachmovie-con-first">

                        <div className="eachmovie-theaters">
                            <h1>Theaters</h1>
                            <div className="eachmovie-theaters-all">
                                {
                                    allTheatersData.length>0 && 
                                    allTheatersData.map((theateritem,idx)=>(
                                        <div className={`eachmovie-theaters-each ${theateritem.theateruid===bookingDetails.theateruid?'active-theater':''}`} key={idx} onClick={(e)=>setBookingDetails(prev=>({
                                            ...prev,
                                            theateruid:theateritem.theateruid,
                                            theatername:theateritem.theatername
                                        }))}>
                                            <LocationOnIcon sx={{fontSize:20 , color:'white'}}/>
                                            <p>{theateritem.theatername}</p>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>

                        <div className="eachmovie-dates">
                            <h1>Dates</h1>
                            <div className="eachmovie-dates-all">
                                {
                                    nextDates.map((item,idx)=>(
                                        <div className={`eachmovie-dates-each ${item.wholedate===bookingDetails.date?'active-datesdata':''}`} key={idx} onClick={()=>setBookingDetails(prev=>({
                                            ...prev,
                                            date:item.wholedate
                                        }))}>
                                            <div className="eachmovie-dates-date-month">
                                                <p>{item.date}</p>
                                                <p>{item.month}</p>
                                            </div>
                                            <p>{item.day}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="eachmovie-shows">
                            <h1>Time</h1>
                            <div className="eachmovie-shows-all">
                                {
                                    Shows.map((item,idx)=>(
                                        <div className={`eachmovie-shows-each ${item.start===bookingDetails.starttime?'active-timedata':''}`} key={idx} onClick={()=>setBookingDetails(prev=>({
                                            ...prev,
                                            starttime:item.start,
                                            endtime:item.end
                                        }))}>
                                            <input type="time" value={item.start} readOnly/>
                                            <p>-</p>
                                            <input type="time" value={item.end} readOnly/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="eachmovie-con-second">
                        <div className="eachmovie-image">
                            <img src={bookingDetails.movieimgurl} alt='each-movie-poster'/>
                        </div>
                        <h1>{bookingDetails.moviename}</h1>
                        <p>{bookingDetails.moviedes}</p>
                        <p>Duration: {bookingDetails.moviedur} min</p>
                        <p>type:  {bookingDetails.movietype}</p>
                        <p>ticket cost: ${bookingDetails.ticketcost}</p>
                    </div>
                    
                </div>
                {/* booking details */}
                {
                        bookingDetails.theatername!=='' && bookingDetails.date!=='' && bookingDetails.starttime!=='' && (isLoggedIn?
                        <div className="eachmovie-booking-tickets">
                            <div className="eachmovie-booking-tickets-select">
                                <label>Total tickets</label>
                                <select value={bookingDetails.totaltickets} onChange={(e)=>setBookingDetails(prev=>({
                                    ...prev,
                                    totaltickets:e.target.value
                                }))}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                            </div>
                        </div>:<p className="eachmovie-pleaselogin">please <span onClick={()=>navigate('/login')}>signIn</span></p>)
                    }
                    {
                        bookingDetails.theatername!=='' && bookingDetails.date!=='' && bookingDetails.starttime!=='' && isLoggedIn &&
                        <div className="eachmovie-receipt-con">
                            <div className="eachmovie-booking-receipt">
                                <h1 className="eachmovie-receipt-header">Booking details</h1>
                                <h2 className="eachmovie-receipt-schedule">schedule</h2>
                                <div className="eachmovie-receipt-each">
                                    <p>movie title</p>
                                    <h2>{bookingDetails.moviename}</h2>
                                </div>
                                <div className="eachmovie-receipt-each">
                                    <p>date</p>
                                    <h2>{bookingDetails.date.split('T')[0]}</h2>
                                </div>
                                <div className="eachmovie-receipt-row">
                                    <div className="eachmovie-receipt-each">
                                        <p>total tickets</p>
                                        <h2>{bookingDetails.totaltickets}</h2>
                                    </div>
                                    <div className="eachmovie-receipt-each">
                                        <p>Hours</p>
                                        <h2>{bookingDetails.starttime}</h2>
                                    </div>
                                </div>
                                <p className="eachmovie-receipt-transaction">Transaction Detail</p>
                                <div className="eachmovie-receipt-transaction-each">
                                    <div className="eachmovie-receipt-row transaction-details-each">
                                        <p>Regular seat</p>
                                        <p>${bookingDetails.ticketcost} x {bookingDetails.totaltickets}</p>
                                    </div>
                                    <div className="eachmovie-receipt-row transaction-details-each">
                                        <p>service charge</p>
                                        <p>$0</p>
                                    </div>
                                    <div className="eachmovie-receipt-row transaction-details-each transaction-payment" >
                                        <h2>Total Payment</h2>
                                        <p>${Number(bookingDetails.ticketcost)*Number(bookingDetails.totaltickets)}</p>
                                    </div>
                                </div>
                                <small>*purchased tickets cannot be cancelled</small>
                                <button onClick={(e)=>handleBookNewTickets(e)}>Buy Ticket</button>
                            </div>
                        </div>
                    }
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

export default Eachmovie;