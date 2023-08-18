
'use client'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    user:null,
    newuser: null,
    status:"idle"

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
        console.log("response" ,d);
        return d;
    }
);



export const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        
        updateNewUser:(state,action) => {
            console.log("UpdatenewUser");
            state.newuser = {...state.newuser,...action.payload}
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
            



    },


});

export const { updateNewUser } = userSlice.actions;
export default userSlice.reducer;