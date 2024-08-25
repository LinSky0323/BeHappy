"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState ={
    timelist:{},
    bookinglist:[],
}

export const BookingListSlices = createSlice({
    name:"bookingListSlices",
    initialState,
    reducers:{
        setBookingList(state,action:PayloadAction<[]>){
            state.bookinglist= action.payload
        },
        setTimeList(state,action:PayloadAction<{}>){
            state.timelist= action.payload
        }
    },
    selectors:{
        selectBookingList:(bookingListSlices) => bookingListSlices.bookinglist,
        selectTimeList:(bookingListSlices) => bookingListSlices.timelist,
}})

export const {setBookingList,setTimeList} = BookingListSlices.actions
export const {selectBookingList,selectTimeList} = BookingListSlices.selectors
export default BookingListSlices.reducer