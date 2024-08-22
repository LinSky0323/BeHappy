import { checkAuth } from "@/lib/firebase/firaAuth"
import { addBookingItem } from "@/lib/firebase/firestore"
import { NextResponse } from "next/server"

export async function POST(request:Request){
    const data = await request.json()
    const obj = {name:data.uid,items:data.items}
    let res:any
    console.log(123)
    data.hours.forEach((item:any)=>{
        try{
            addBookingItem(data.uid,obj,data.year,data.month,data.day,item)
            .then((i)=>res=i)
            console.log(456)
        }
        catch(error){
            console.log(789)
            res = error
        }
    })
    return NextResponse.json(data)
}