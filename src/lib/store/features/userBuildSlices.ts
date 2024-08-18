"use client"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface liststate{
    titleName?:string,
    writerName?:string,
    introduceImage?:string,
    introduceContent?:string[],
    displayList?:any[],
    bookingList?:any[],

}


interface buildState{
    buildList:liststate,
    timeList:any
}
const initialState:buildState ={
    buildList:{
        titleName:"",
        writerName:"",
        introduceImage:"",
        introduceContent:[],
        displayList:[],
        bookingList:[]
    },
    timeList:{}
}

export const UserBuildSlices = createSlice({
    name:"userBuildSlices",
    initialState,
    reducers:{
        setBuildList(state,action:PayloadAction<liststate>){
            state.buildList = action.payload
        },
        setTime(state,action:PayloadAction<any>){
            state.timeList = action.payload
        }
    },
    selectors:{
        selectBuildList:(userBuildSlices) => userBuildSlices.buildList,
        selectTimeList:(userBuildSlices) => userBuildSlices.timeList,
}})

export const {setBuildList,setTime} = UserBuildSlices.actions
export const {selectBuildList,selectTimeList} = UserBuildSlices.selectors
export default UserBuildSlices.reducer