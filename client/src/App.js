import React from 'react';
import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Eachmovie from './Components/Eachmovie/Eachmovie';
import Bookingdetails from './Components/Bookingdetails/Bookingdetails';
import Addmovies from './Components/Addmovies/Addmovies';
import AddTheaters from './Components/Addtheaters/AddTheaters';
import Ticketadmhistory from './Components/Ticketadmhistory/Ticketadmhistory';
import { useSelector } from 'react-redux';
import Mytickets from './Components/Mytickets/Mytickets';

function App() {
  const isLoggedIn = useSelector((state)=>state.userdata.isLoggedIn);
  const userrole = useSelector((state)=>state.userdata.userrole);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        {
          isLoggedIn ===false && <Route path='/login' element={<Login/>}/>
        }
        {
          isLoggedIn ===false && <Route path='/register' element={<Register/>}/>
        }
        <Route path='/eachmovie/:movieid' element={<Eachmovie/>}/>
        <Route path='/bookingdetails' element={<Bookingdetails/>}/>
        {
          isLoggedIn && userrole==='admin' && 
          <>
            <Route path='/addmovies' element={<Addmovies/>}/>
            <Route path='/addtheaters' element={<AddTheaters/>}/>
            <Route path='/bookingdetails' element={<Bookingdetails/>}/>
          </>
        }
        
        <Route path='/ticketadmhistory' element={<Ticketadmhistory/>}/>
        {
          isLoggedIn && <Route path='/mytickets' element={<Mytickets/>}/>
        }
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
