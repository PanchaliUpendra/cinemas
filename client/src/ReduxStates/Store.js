import { configureStore } from "@reduxjs/toolkit";
import Userdata from "./Usersdata";
import Moviesdata from "./Moviesdata";
import Theatersdata from "./Theatersdata";

export const Store = configureStore({
    reducer:{
        userdata:Userdata,
        moviesdata:Moviesdata,
        theatersdata:Theatersdata
    },
});