"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState ={
    list:{}
}

export const ProfileSlices = createSlice({
    name:"profileSlices",
    initialState,
    reducers:{
        setProfileList(state,action:PayloadAction<{}>){
            state.list= action.payload
        }},
    selectors:{
        selectProfileList:(profileSlices) => profileSlices.list,
}})

export const {setProfileList} = ProfileSlices.actions
export const {selectProfileList} = ProfileSlices.selectors
export default ProfileSlices.reducer