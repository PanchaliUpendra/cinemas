import { createSlice } from "@reduxjs/toolkit";
export const Userdata = createSlice({
    name:'userdata',
    initialState:{
        userrole:'',
        username:'',
        useremail:'',
        useruid:'',
        userphone:'',
        isLoggedIn:false
    },
    reducers:{
        storeUserLoginDetails:(state,action)=>{
            state.userrole=action.payload.userrole;
            state.username=action.payload.username;
            state.useremail=action.payload.useremail;
            state.useruid=action.payload.useruid;
            state.userphone=action.payload.userphone;
            state.isLoggedIn=action.payload.isLoggedIn;
        },
        clearStoredUserData:(state)=>{
            state.userrole='';
            state.username='';
            state.useremail='';
            state.useruid='';
            state.userphone='';
            state.isLoggedIn=false;
        }

    }
});

export const {clearStoredUserData,storeUserLoginDetails} = Userdata.actions;
export default Userdata.reducer;