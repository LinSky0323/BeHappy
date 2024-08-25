"use client"
import { configureStore } from "@reduxjs/toolkit";
import personPageReducer from "./features/personPageSlices"
import userBuildReducer from "./features/userBuildSlices"
import transcationReducer from "./features/transcationSlices"
import bookingListReducer from "./features/bookingListSlices"


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

export const makeBookingListStore = ()=>{
    return configureStore({
        reducer:{
           bookingListSlices:bookingListReducer
        }
    })
}
export type BookingListStore = ReturnType<typeof makeBookingListStore>
export type BookingListState = ReturnType<BookingListStore["getState"]>
export type BookingListDispatch = BookingListStore["dispatch"]

export type PersonPageStore = ReturnType<typeof makePersonPageStore>
export type PersonPageState = ReturnType<PersonPageStore["getState"]>
export type PersonPageDispatch = PersonPageStore["dispatch"]

export type UserBuildStore = ReturnType<typeof makeUserBuildStore>
export type UserBuildState = ReturnType<UserBuildStore["getState"]>
export type UserBuildDispatch = UserBuildStore["dispatch"]

export type TransactionStore = ReturnType<typeof makeTranscationStore>
export type TransactionState = ReturnType<TransactionStore["getState"]>
export type TransactionDispatch = TransactionStore["dispatch"]

