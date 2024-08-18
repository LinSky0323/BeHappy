import {firebaseConfig,db} from "./firebaseApp"
import { arrayUnion, collection, doc, getDoc, getDocFromServer, getFirestore, setDoc, updateDoc } from "firebase/firestore"

export async function createListData(uid:string,obj:{}){
    const ref = doc(db,uid,"listdb")

    return new Promise(async(resolve,reject)=>{
        try{
            await updateDoc(ref,obj)
            resolve("修改成功")
        }
        catch(error:any){
            if(error.code ==="not-found"){
                try{
                    await setDoc(ref,obj)
                    resolve("創建成功")
                }
                catch(seterror){
                    reject(seterror)
                }
            }
            else{
                reject(error)
            }
        }
    })
}

export async function addListData(uid:string,data:string,obj:{}){
    const ref = doc(db,uid,"listdb")

    return new Promise(async(resolve,reject)=>{
        try{
            await updateDoc(ref,{
                [data]:arrayUnion(obj)
            })
            resolve("新增成功")
        }
        catch(error){
            reject(error)
        }
    })
}

export async function getListData(uid:string){
    const ref = doc(db,uid,"listdb")
    try{
        const data = await getDocFromServer(ref)
        if(data.exists()){
            return data.data()
        }
        else{
            return null
        }
    }
    catch(error){
        throw error
    }
}

export async function setTimeData(uid:string,obj:{}){
    const ref = doc(db,uid,"timedb")

    return new Promise(async(resolve,reject)=>{
        try{
            await updateDoc(ref,obj)
            resolve("修改成功")
        }
        catch(error:any){
            console.log(error.code)
            if(error.code === "not-found"){
                try{
                    await setDoc(ref,obj)
                    resolve("創建成功")
                }
                catch(seterror){
                    reject(seterror)
                }
            }
            else{
                reject(error)
            }
        }
    })
}

export async function getTimeData(uid:string){
    const ref = doc(db,uid,"timedb")
    try{
        const data = await getDocFromServer(ref)
        if(data.exists()){
            return data.data()
        }
        else{
            return null
        }
    }
    catch(error){
        throw error
    }
}
export async function setProfile(uid:string,obj:{}){
    const ref = doc(db,uid,"profiledb")

    return new Promise(async(resolve,reject)=>{
        try{
            await updateDoc(ref,obj)
            resolve("修改成功")
        }
        catch(error:any){
            console.log(error.code)
            if(error.code === "not-found"){
                try{
                    await setDoc(ref,obj)
                    resolve("創建成功")
                }
                catch(seterror){
                    reject(seterror)
                }
            }
            else{
                reject(error)
            }
        }
    })
}