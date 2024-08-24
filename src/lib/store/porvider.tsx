"use client"
import { Provider } from "react-redux";
import {  makePersonPageStore,makeTranscationStore,makeUserBuildStore,PersonPageStore, TransactionStore, UserBuildStore } from "./store";
import { useRef } from "react";



export function PersonPageProviders({children}:{children:React.ReactNode;}){
    const storeRef = useRef<PersonPageStore>()
    if(!storeRef.current){
        storeRef.current = makePersonPageStore()
    }
    return <Provider store={storeRef.current}>{children}</Provider>
} 

export function UserBuildProviders({children}:{children:React.ReactNode;}){
    const storeRef = useRef<UserBuildStore>()
    if(!storeRef.current){
        storeRef.current = makeUserBuildStore()
    }
    return <Provider store={storeRef.current}>{children}</Provider>
} 

export function TranscationProviders({children}:{children:React.ReactNode;}){
    const storeRef = useRef<TransactionStore>()
    if(!storeRef.current){
        storeRef.current = makeTranscationStore()
    }
    return <Provider store={storeRef.current}>{children}</Provider>
} 


