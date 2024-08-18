"use client"
import { configureStore } from "@reduxjs/toolkit";
import personPageReducer from "./features/personPageSlices"
import userBuildReducer from "./features/userBuildSlices"


export const makePersonPageStore = ()=>{
    return configureStore({
        reducer:{
            personPageSlices:personPageReducer
        }
    })
}
export const makeUserBuildStore = ()=>{
    return configureStore({
        reducer:{
            userBuildSlices:userBuildReducer
        }
    })
}


export type PersonPageStore = ReturnType<typeof makePersonPageStore>
export type PersonPageState = ReturnType<PersonPageStore["getState"]>
export type PersonPageDispatch = PersonPageStore["dispatch"]

export type UserBuildStore = ReturnType<typeof makeUserBuildStore>
export type UserBuildState = ReturnType<UserBuildStore["getState"]>
export type UserBuildDispatch = UserBuildStore["dispatch"]

