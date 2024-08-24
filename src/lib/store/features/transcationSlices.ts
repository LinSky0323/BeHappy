"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState ={
    list:{}
}

export const TranscationSlices = createSlice({
    name:"transcationSlices",
    initialState,
    reducers:{
        setTranscationList(state,action:PayloadAction<{}>){
            state.list= action.payload
        }},
    selectors:{
        selectTranscationList:(userBuildSlices) => userBuildSlices.list,
}})

export const {setTranscationList} = TranscationSlices.actions
export const {selectTranscationList} = TranscationSlices.selectors
export default TranscationSlices.reducer