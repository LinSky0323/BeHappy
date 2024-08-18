"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

export const PersonPageSlices = createSlice({
    name:"personPageSlices",
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
        selectbookingList :(personPageSlices)=> personPageSlices.bookingList
    }
})

export const {addbookingList,delbookingList,setbookingListTime} = PersonPageSlices.actions;
export const {selectbookingList} = PersonPageSlices.selectors;
export default PersonPageSlices.reducer