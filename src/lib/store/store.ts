"use client"
import { configureStore } from "@reduxjs/toolkit";
import personPageReducer from "./features/personPageSlices"
import userBuildReducer from "./features/userBuildSlices"
import transcationReducer from "./features/transcationSlices"


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
export const makeTranscationStore = ()=>{
    return configureStore({
        reducer:{
            transcationSlices:transcationReducer
        }
    })
}


export type PersonPageStore = ReturnType<typeof makePersonPageStore>
export type PersonPageState = ReturnType<PersonPageStore["getState"]>
export type PersonPageDispatch = PersonPageStore["dispatch"]

export type UserBuildStore = ReturnType<typeof makeUserBuildStore>
export type UserBuildState = ReturnType<UserBuildStore["getState"]>
export type UserBuildDispatch = UserBuildStore["dispatch"]

export type TransactionStore = ReturnType<typeof makeTranscationStore>
export type TransactionState = ReturnType<TransactionStore["getState"]>
export type TransactionDispatch = TransactionStore["dispatch"]

