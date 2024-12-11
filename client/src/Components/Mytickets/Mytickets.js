import React, { useEffect, useState } from "react";
import './Mytickets.css';
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { API_URL } from "../../Docs/Data";

function Mytickets(){
    const [userTickets,setUserTickets] = useState([]);
    const useruid = useSelector((state)=>state.userdata.useruid);
    useEffect(()=>{
        async function handlefetchAllUserBookings(){
            try{
                const tktres = await fetch(`${API_URL}/bookings/getEachUserBookings/${useruid}`,{
                    credentials:'include'
                });
                const resData = await tktres.json();
                if(resData.success){
                    setUserTickets(resData.tickets);
                }else{
                    console.log('getting an error while fetching the users tickets',resData.message);
                }
            }catch(err){
                console.log('getting an error fetching user bookings ',err);
            }
        }
        handlefetchAllUserBookings()
    },[useruid]);
    return(
        <>
            <Navbar/>
            <div className="homepage-con">
                {/* two blur images */}
                <div className="homepage-blur-img1"></div>
                <div className="homepage-blur-img2"></div>

                {/* users tickets */}
                <div className="users-tickets-con">
                    <h1 className="users-tickets-header">My Tickets</h1>
                    
                    {
                        userTickets.length>0 ?
                        <div className="mytickets-all">
                            {
                                userTickets.map((tkts,idx)=>(
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

export default Mytickets;