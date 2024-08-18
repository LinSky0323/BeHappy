"use client"

import { usePathname, useRouter } from "next/navigation"
import { checkAuth } from "./firebase/firaAuth"

export async function Agree(){
    const path = usePathname()
    const router = useRouter()
    const p = path.split("/")
    if(p[1]&&p[1]==="user"){
        try{
            const res = await checkAuth() as any
            if(p[2] && p[2]===res.uid){return true}
            else if(p[2] && p[2]!==res.uid){
                throw Error
            }
        }
        catch(error){
            router.push("/")
        }
    }
}