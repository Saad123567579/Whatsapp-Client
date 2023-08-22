
'use client'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    user:null,
    newuser: null,
    status:"idle",
    show:"current",
    allContacts:null,
    ciUser:null,
    msglog:[],
    socket:null

};


export const getUserAsync = createAsyncThunk(
    'user/getUser',
    async () => {
        let url = "http://localhost:4000/user/getuser";
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },

        });
        const d = await response.json();
        
        return d;
    }
);

export const getallContactsAsync = createAsyncThunk(
    'user/getallContacts',
    async () => {
        let url = "http://localhost:4000/user/getalluser";
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },

        });
        const d = await response.json();
      
        return d;
    }
);



export const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        
        updateNewUser:(state,action) => {
            
            state.newuser = {...state.newuser,...action.payload}
        },
        toggleContact:(state)=>{
            state.show = "contact";
        },
        toggleCurrent:(state)=>{
            state.show = "current";
        },
        setCIUser:(state,action) => {
            state.ciUser = action.payload
        },
        setMsgLog:(state,action) => {
            state.msglog = [...action.payload]
        },
        setSocket:(state,action) => {
            state.socket = action.payload;
        },
        updateMsglog:(state,action) => {
            state.msglog.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                if(action.payload=="Token Not Found" || action.payload=="Invalid Token" || action.payload=='False' || action.payload=="Internal Server Error") return;
                else{
                    state.user = action.payload;
                }
            })
            .addCase(getallContactsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getallContactsAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                if(action.payload=="Internal Server Error") return;
                else{
                    state.allContacts = action.payload;
                }
            })
            
            



    },


});

export const { updateNewUser,toggleContact,toggleCurrent,setCIUser,setMsgLog,setSocket ,updateMsglog} = userSlice.actions;
export default userSlice.reducer;