"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface BookingItem{
    item:string,
    price:number,
    time:number
}

interface BookingState{
    bookingList:{
        items:BookingItem[],
        time:number[]
    }
    
}
const initialState:BookingState ={
    bookingList:{
        items:[],
        time:[]
    }
}

export const Slices = createSlice({
    name:"slices",
    initialState,
    reducers:{
        addbookingList(state,action:PayloadAction<BookingItem>){
            state.bookingList.items.push(action.payload)
        },
        delbookingList(state,action:PayloadAction<BookingItem>){
            state.bookingList.items=state.bookingList.items.filter((obj)=>obj.item !== action.payload.item)
        },
        setbookingListTime(state,action:PayloadAction<number[]>){
            state.bookingList.time = action.payload
        }
    },
    selectors:{
        selectbookingList :(slices)=> slices.bookingList
    }
})

export const {addbookingList,delbookingList,setbookingListTime} = Slices.actions;
export const {selectbookingList} = Slices.selectors;
export default Slices.reducer