
'use client'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {

    newuser: null,
    status:"idle"

};


// export const getUserAsync = createAsyncThunk(
//     'user/getUser',
//     async () => {
//         let url = "https://stubebackend.vercel.app/auth/getuser";
//         const response = await fetch(url, {
//             method: 'GET',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Add any additional headers if needed
//             },

//         });
//         const d = await response.json();
//         return d;
//     }
// );



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
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(signupUserAsync.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(signupUserAsync.fulfilled, (state, action) => {

    //         })
            



    // },


});

export const { updateNewUser } = userSlice.actions;
export default userSlice.reducer;