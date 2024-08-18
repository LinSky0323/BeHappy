"use client"

import { useState } from "react"

export function useChangeRemind(){
    const [state,setState] = useState("")
    const setRemind = (prop:string) =>{ 
        setState(prop)
        setTimeout(()=>{
            setState("")
        },2000)
    }
    return{
        state,
        setRemind
    }
    
} 