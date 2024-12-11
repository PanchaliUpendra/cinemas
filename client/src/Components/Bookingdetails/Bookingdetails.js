import React, { useEffect, useState } from "react";
import './Bookingdetails.css';
import Navbar from "../Navbar/Navbar";
import { API_URL } from "../../Docs/Data";

function Bookingdetails(){

    const [allbookings , setAllbookings] = useState([]);
    useEffect(()=>{
        async function handleFetchAllBookings(){
            try{
                const bookRes = await fetch(`${API_URL}/bookings/getallbookings`,{
                    credentials:'include'
                });
                const resData = await bookRes.json();
                // console.log('here is the data ',resData);
                if(resData.success){
                    setAllbookings(resData.alltickets);
                }else{
                    setAllbookings([]);
                }
            }catch(err){
                console.log('getting an error while fetching the bookings ',err);
            }
        }
        handleFetchAllBookings()
    },[]);
    return(
        <>
            <Navbar/>
            <div className="homepage-con">
                {/* two blur images */}
                <div className="homepage-blur-img1"></div>
                <div className="homepage-blur-img2"></div>

                {/* user bookings */}
                <div className="bookingdetails-con">
                    <h1 className="bookingdetails-header">bookings</h1>
                    {
                        allbookings.length>0 ?
                        <div className="mytickets-all">
                            {
                                allbookings.map((tkts,idx)=>(
                                    <div className="mytickets-each" key={idx}>
                                        <div className="mytickets-outer-each">
                                            <div className="mytickets-inner-each">
                                                <p>date</p>
                                                <h2>{tkts.date}</h2>
                                            </div>
                                            <div className="mytickets-inner-each">
                                                <p>hours</p>
                                                <h2>{tkts.starttime}</h2>
                                            </div>
                                        </div>
                                        
                                        <div className="mytickets-outer-each" style={{marginTop:10}}>
                                            <div className="mytickets-inner-each">
                                                <p>movie title</p>
                                                <h2>{tkts.moviename}</h2>
                                            </div>

                                            <div className="mytickets-each-img" style={{overflow:'hidden',borderRadius:4}}>
                                                <img src={tkts.movieimgurl} alt='posters'/>
                                            </div>
                                        </div>
                                        
                                        <div className="mytickets-outer-each" >
                                            <div className="mytickets-inner-each">
                                                <p>tickets</p>
                                                <h2>{tkts.totaltickets}</h2>
                                            </div>
                                            <div className="mytickets-inner-each">
                                                <p>Theater name</p>
                                                <h2>{tkts.theatername}</h2>
                                            </div>
                                        </div>

                                        {/* user detaisl */}
                                        <h2 className="bookingdetails-userheader">user details</h2>
                                        <div className="mytickets-inner-each" style={{marginTop:5}}>
                                            <p>user name</p>
                                            <h2>{tkts.username}</h2>
                                        </div>

                                        <div className="mytickets-inner-each" style={{marginTop:5}}>
                                            <p>user email</p>
                                            <h2>{tkts.useremail}</h2>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                         :<p className="mytickets-notbooked-tickets">You haven't booked any tickets yet.</p>
                    }
                </div>
            </div>
        </>
    );
}

export default Bookingdetails;