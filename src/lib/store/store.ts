"use client"
import { configureStore } from "@reduxjs/toolkit";
import slicesReducer from "./features/slices"

export const makeStore = ()=>{
    return configureStore({
        reducer:{
            slices:slicesReducer
        }
    })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]