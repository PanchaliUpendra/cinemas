import React, { useEffect, useState } from "react";
import './Addmovies.css';
import Navbar from "../Navbar/Navbar";
import {v4 as uuidv4} from 'uuid';
import { API_URL } from "../../Docs/Data";
import {  getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Addmovies(){

    const[showloading,setshowloading] = useState(false);
    const [allmovies,setAllmovies] = useState([]);
    const [movieImageFile, setMovieImageFile] = useState('');
    const [ movieData,setMovieData] = useState({
        moviename:'',
        movieuid:'',
        movieimgurl:'',
        moviedes:'',
        movietype:'',
        moviedur:0,
        movietktcost:0
    });

    //handle movie image upload
    function handleMovieImageUpload(e){
        const selectedFile = e.target.files[0];
        setMovieImageFile(selectedFile);
    }

    //downloading the file url from datastorage
    const downloadfileurl = async() =>{
        try{
            return new Promise((resolve,reject)=>{
                const storageref = ref(storage,`movies/${movieData.moviename}`);
                const downloadurl = getDownloadURL(storageref);
                resolve(downloadurl);
            })
                
        }catch(e){
            console.log('you getting an error while downloading url ',e);
        }
    }

    async function handleAddNewMovie(e){
        e.preventDefault();
        setshowloading(true);
        try{
            if(movieData.moviename!=='' && movieData.moviedur>0 && movieData.moviedes!=='' && movieData.movietktcost>0 && movieData.movietype!=='' && movieImageFile!==''){
                var fileurl='';
                try{
                    const storageref = ref(storage,`movies/${movieData.moviename}`);
                    const response = await uploadBytes(storageref,movieImageFile);
                    if(response){
                        fileurl = await downloadfileurl();
                    }else{
                        console.log('response error');
                    }

                }catch(error){
                    console.error('you got an error while uploading gthe file, ', error);
                    alert('you got an  error');
                }

                if(fileurl!==''){
                    const uuid = uuidv4();
                    const addmovieRes = await fetch(`${API_URL}/movies/addmovie`,{
                        method:'POST',
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            ...movieData,
                            movieuid:uuid,
                            movieimgurl:fileurl
                        }),
                        credentials:'include'
                    });
                    const resData = await addmovieRes.json();
                    if(resData.success){
                        alert(resData.message);
                        setAllmovies(prev=>([{
                            ...movieData,
                            movieuid:uuid,
                            movieimgurl:fileurl
                        },...prev]));
                        setMovieData(prev=>({
                            ...prev,
                            moviename:'',
                            movieuid:'',
                            movieimgurl:'',
                            moviedes:'',
                            movietype:'',
                            moviedur:0,
                            movietktcost:0
                        }));
                    }else{
                        alert(resData.message);
                    }
                }
            }else{
                alert('please all required fields');
            }
        }catch(err){

        }
        setshowloading(false);
    }

    useEffect(()=>{
        async function fetchAllMoviesData(){
            try{
                const moviesRes = await fetch(`${API_URL}/movies/getmovies`,{
                    credentials:'include'
                });
                const resData = await moviesRes.json();
                if(resData.success){
                    setAllmovies(resData.movies);
                }else{
                    setAllmovies([]);
                }
            }catch(err){
                console.log('getting an error while fetching movies data ',err);
            }
        }
        fetchAllMoviesData();
    },[]);

    return(
        <>
            <Navbar/>
            <div className="homepage-con">
                {/* two blur images */}
                <div className="homepage-blur-img1"></div>
                <div className="homepage-blur-img2"></div>

                {/* add movies */}
                <form className="addmovies-form">
                    <h1>add movie</h1>
                    <div className="addmovies-all-divs">
                        <div className="addmovies-div-each">
                            <label>movie name</label>
                            <input type='text' placeholder="Movie Name..." value={movieData.moviename} onChange={(e)=>setMovieData(prev=>({
                                ...prev,
                                moviename:e.target.value
                            }))}/>
                        </div>
                        <div className="addmovies-div-each">
                            <label>movie type</label>
                            <input type='text' placeholder="Movie Type..." value={movieData.movietype} onChange={(e)=>setMovieData(prev=>({
                                ...prev,
                                movietype:e.target.value
                            }))}/>
                        </div>
                        
                    </div>

                    <div className="addmovies-all-divs">
                        <div className="addmovies-div-each">
                            <label>movie duration</label>
                            <input type='number' placeholder="Movie Duration..." value={movieData.moviedur} onChange={(e)=>setMovieData(prev=>({
                                ...prev,
                                moviedur:e.target.value
                            }))}/>
                        </div>
                        <div className="addmovies-div-each">
                            <label>Ticket cost</label>
                            <input type='number' value={movieData.movietktcost} onChange={(e)=>setMovieData(prev=>({
                                ...prev,
                                movietktcost:e.target.value
                            }))}/>
                        </div>
                        <div className="addmovies-div-each">
                            <label>movie Image</label>
                            <input type='file' accept="image/*"  onChange={(e)=>handleMovieImageUpload(e)}/>
                        </div>
                    </div>
                    
                    <textarea placeholder="Write Movie description..." value={movieData.moviedes} onChange={(e)=>setMovieData(prev=>({
                                ...prev,
                                moviedes:e.target.value
                            }))}/>
                    <button onClick={(e)=>handleAddNewMovie(e)}>
                        + Add Movie
                    </button>
                </form>

                {/* display all added movies */}

                <h2 className="addmovies-movies-header">Added movies</h2>
                {
                    allmovies.length>0 && 
                    <div className="addmovies-movies-all">
                        {
                            allmovies.map((item,idx)=>(
                                <div key={idx} className="addmovies-movies-each">
                                    <div className="addmovies-movies-each-img">
                                        <img src={item.movieimgurl} alt='movies poster'/>
                                    </div>
                                    <h1>{item.moviename}</h1>
                                    <p>{item.moviedes}</p>
                                    <p>movie duration: {item.moviedur}min</p>
                                    <p>ticket cost: ${item.movietktcost}</p>
                                    <p>type:{item.movietype}</p>
                                </div>
                            ))
                        }
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

export default Addmovies;