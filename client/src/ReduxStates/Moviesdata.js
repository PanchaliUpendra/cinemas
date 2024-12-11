import { createSlice } from "@reduxjs/toolkit";

export const Moviesdata = createSlice({
    name:'moviesdata',
    initialState:{
        data:[]
    },
    reducers:{
        storeAllMoviesData:(state,action)=>{
            state.data=[...action.payload]
        }
    }
});

export const {storeAllMoviesData} = Moviesdata.actions;
export default Moviesdata.reducer