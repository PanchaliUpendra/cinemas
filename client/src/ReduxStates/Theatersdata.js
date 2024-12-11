import { createSlice } from "@reduxjs/toolkit";

export const Theatersdata = createSlice({
    name:'theatersdata',
    initialState:{
        data:[]
    },
    reducers:{
        storeAllTheatersData:(state,action)=>{
            state.data=[...action.payload]
        }
    }
});

export const {storeAllTheatersData} = Theatersdata.actions;
export default Theatersdata.reducer