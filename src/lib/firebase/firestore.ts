import { addDoc } from "firebase/firestore/lite"
import {firebaseConfig,db} from "./firebaseApp"
import { arrayUnion, collection, doc, getDoc, getDocFromServer, getFirestore, runTransaction, setDoc, updateDoc } from "firebase/firestore"

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
}//創建、更新list

export async function setBookingItem(uid:string,obj:{},year:number,month:number,day:number,hour:number[]){
    const ref = doc(db,uid,"timedb")
    
    const promises = hour.map((item)=>{
        return new Promise(async(resolve,reject)=>{
            const i = year+"."+month+"."+day+"."+item
            try{
                await updateDoc(ref,{
                    [i]:obj
                })
                resolve("新增成功")
            }
            catch(error){
                reject(error)
            }
        })
    })
    return Promise.all(promises)
    
}//單點更新time

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
}//拿到list

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
}//創建、更新time

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
}//拿到time
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
}//創建、更新profile

export async function getProfile(uid:string){
    const ref = doc(db,uid,"profiledb")
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
}//拿到profile

export async function addShopping(uid:string,obj:{}){
    const ref = collection(db,"IO","shopping",uid)

    return new Promise(async(resolve,reject)=>{
        try{
            const res = await addDoc(ref,obj)
            resolve(res.id)
        }
        catch(error:any){
            reject(error)
        }
    })
}//新增自己的消費記錄

export async function addBooking(uid:string,obj:{},id:string) {
    const ref = doc(db,"IO","booking",uid,id)

    return new Promise(async(resolve,reject)=>{
        try{
            const res = await setDoc(ref,obj)
            resolve("新增成功")
        }
        catch(error:any){
            reject(error)
        }
    })
}//根據新增消費記錄的ID，新增業者的訂單清單

export async function pushBookingItem(myuid:string,youruid:string,shoppingData:{},bookingData:{},year:number,month:number,day:number,hour:number[]){
    try{
        await runTransaction(db,async(transaction)=>{
            const timeRef = doc(db,youruid,"timedb")
            const uid = String(year)+String(month)+String(day)+myuid
            const addRef = doc(db,"IO","shopping",myuid,uid)
            const bookingRef = doc(db,"IO","booking",youruid,uid)

            hour.map((item)=>{
                const i = year+"."+month+"."+day+"."+item
                transaction.update(timeRef,{[i]:uid})
            })
            transaction.set(addRef,shoppingData)
            transaction.set(bookingRef,bookingData)
        })
        return "新增成功"
    }
    catch(error){
        console.error("Transaction failed: ", error);
        throw new Error("Transaction failed");
    }
}