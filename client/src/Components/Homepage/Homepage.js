import React, { useEffect, useRef } from "react";
import './Homepage.css';
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeAllMoviesData } from "../../ReduxStates/Moviesdata";
import { API_URL } from "../../Docs/Data";

function Homepage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchCheckOnlyonce = useRef(false);
    const isLoggedIn = useSelector((state)=>state.userdata.isLoggedIn);
    const userrole = useSelector((state)=>state.userdata.userrole);
    const allMovies = useSelector((state)=>state.moviesdata.data);

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
            fetchCheckOnlyonce.current=true;
        }
    },[allMovies.length,dispatch]);
    return(
        <>
            <Navbar/>
            <div className="homepage-con">
                {/* two blur images */}
                <div className="homepage-blur-img1"></div>
                <div className="homepage-blur-img2"></div>

                {/* admin below navbar */}
                {
                    isLoggedIn && userrole==='admin' && 
                    <ul className="homepage-admin-nav">
                        <li onClick={()=>navigate('/addmovies')}>Add Movies</li>
                        <li onClick={()=>navigate('/addtheaters')}>Add Theaters</li>
                        <li onClick={()=>navigate('/bookingdetails')}>user bookings</li>
                    </ul>
                }
                

                {/* now showing */}
                <h1 className="homepage-header">Now Showing</h1>

                {/* showing all movies */}
                <div className="homepage-show-allmovies">
                    {
                        allMovies.length>0 && allMovies.map((tempmovie,idx)=>(
                            <div className="homepage-each-movie" onClick={()=>navigate(`/eachmovie/${tempmovie.movieuid}`)} key={idx}>
                                <div className="homepage-each-movie-img">
                                    <img src={tempmovie.movieimgurl} alt='poster'/>
                                </div>
                                <p>{tempmovie.moviename}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Homepage;