"use client"

import { useState } from "react"

export function useChangeValue(initialValue: string){
    const [value,setValue] = useState(initialValue)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setValue(event.target.value)
    }
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setValue(event.target.value)
    }
    return {
        value,
        onChange:handleChange,
        onTextCgange:handleTextChange,
        setValue
    }

}