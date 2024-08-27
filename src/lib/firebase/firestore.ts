import { addDoc } from "firebase/firestore/lite"
import {firebaseConfig,db} from "./firebaseApp"
import { arrayUnion, collection, doc, getDoc, getDocFromServer, getDocs, getFirestore, orderBy, query, runTransaction, setDoc, updateDoc } from "firebase/firestore"
import { Oldenburg } from "next/font/google"

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

export async function getShopping(uid:string){
    const ref = collection(db,"IO","shopping",uid)
    const q = query(ref,orderBy("reserveTime"))
    try{
        const data = await getDocs(q)
        if(!data.empty){
            const result = data.docs.map((doc)=>{
                return({id:doc.id,...doc.data()})
            })
            return result
        }
        else{
            return null
        }
    }
    catch(error){
        return error
    }
}//獲得shopping list

export async function getBooking(uid:string){
    const ref = collection(db,"IO","booking",uid)
    const q = query(ref,orderBy("reserveTime"))
    try{
        const data = await getDocs(q)
        if(!data.empty){
            const result = data.docs.map((doc)=>{
                return ({id:doc.id,...doc.data()})
            })
            return result
        }
        else{
            return null
        }
    }
    catch(error){
        return error
    }
}//獲得booking list

export async function setRemark(tradeUid:string,guestUid:string,obj:{}){
    const ref = doc(db,tradeUid,"guestdb")
    const data = await getDoc(ref)
    if(data.exists()){
        const result = data.data()
        const item = result[guestUid]
        try{
            const res = await updateDoc(ref,{[guestUid]:{...item,...obj}})
            return "修改成功"
        }
        catch(error){
            return error
        }
    }
}//修改個人備註
export async function getRemark(tradeUid:string,guestUid:string){
    const ref = doc(db,tradeUid,"guestdb")
    try{
        const data = await getDocFromServer(ref)
        if(data.exists()){
            return data.data()[guestUid]
        }
        else{
            return null
        }
    }
    catch(error){
        throw error
    }
}//獲得備註
export async function pushBookingItem(myuid:string,youruid:string,shoppingData:any,bookingData:any,year:number,month:number,day:number,hour:number[]){
    try{
        await runTransaction(db,async(transaction)=>{
            const Day = new Date()
            const token = Day.toISOString()
            const timeRef = doc(db,youruid,"timedb")
            const uid = token+myuid
            const addRef = doc(db,"IO","shopping",myuid,uid)
            const bookingRef = doc(db,"IO","booking",youruid,uid)
            const myRef = doc(db,myuid,"tradedb")
            const yourRef = doc(db,youruid,"guestdb")

            hour.map((item)=>{
                const i = year+"."+month+"."+day+"."+item
                transaction.update(timeRef,{[i]:{id:uid}})
            })
            transaction.set(addRef,shoppingData)
            transaction.set(bookingRef,bookingData)
            transaction.set(myRef,{[shoppingData.tradeUid]:{name:shoppingData.tradeName}},{merge:true})
            transaction.set(yourRef,{[bookingData.guestUid]:{name:bookingData.guestName}})
        })
        return "新增成功"
    }
    catch(error){
        console.error("Transaction failed: ", error);
        throw new Error("Transaction failed");
    }
}//送出訂單的事務

export async function checkBookingItem(guestUid:string,tradeUid:string,docId:string,check:number,year:number,month:number,day:number,hour:number[]){
    try{
        await runTransaction(db,async(transaction)=>{
            const guestRef = doc(db,"IO","shopping",guestUid,docId)
            const tradeRef = doc(db,"IO","booking",tradeUid,docId)
            const timeRef = doc(db,tradeUid,"timedb")
            transaction.update(guestRef,{check})
            transaction.update(tradeRef,{check})
            if(check===2||check===4){
                hour.map((item)=>{
                    const i = year+"."+month+"."+day+"."+item
                    transaction.update(timeRef,{[i]:{}})
                })
            }
        })
        return true
    }
    catch(error){
        console.error("Transaction failed: ", error);
        throw new Error("Transaction failed");
    }
}//修改訂單狀態的事務

export async function setTotalPrice(guestUid:string,tradeUid:string,docId:string,price:number){
    try{
        await runTransaction(db,async(transaction)=>{
            const guestRef = doc(db,"IO","shopping",guestUid,docId)
            const tradeRef = doc(db,"IO","booking",tradeUid,docId)
            transaction.update(guestRef,{totalPrice:price})
            transaction.update(tradeRef,{totalPrice:price})
        })
        return true
    }
    catch(error){
        console.error("Transaction failed: ", error);
        throw new Error("Transaction failed");
    }
}//修改金額

export async function changeTimeItem(guestUid:string,tradeUid:string,docId:string,oldyear:number,oldmonth:number,oldday:number,oldhours:number[],newyear:number,newmonth:number,newday:number,newhours:number[],reserveTime:number){
    try{
        await runTransaction(db,async(transcation)=>{
            const shoppingRef = doc(db,"IO","shopping",guestUid,docId)
            const bookingRef = doc(db,"IO","booking",tradeUid,docId)
            const timeRef = doc(db,tradeUid,"timedb")
            transcation.update(shoppingRef,{year:newyear,month:newmonth,day:newday,hours:newhours,reserveTime:reserveTime})
            transcation.update(bookingRef,{year:newyear,month:newmonth,day:newday,hours:newhours,reserveTime:reserveTime})
            oldhours.map((item)=>{
                const i =  oldyear+"."+oldmonth+"."+oldday+"."+item
                transcation.update(timeRef,{[i]:{}})
            })
            newhours.map((item)=>{
                const i = newyear+"."+newmonth+"."+newday+"."+item
                transcation.update(timeRef,{[i]:{id:docId}})
            })
        })
        return true
    }
    catch(error){
        console.error("Transaction failed: ", error);
        throw new Error("Transaction failed");
    }
}//變更訂單時間及時間表

export async function levelup(uid:string){
    const ref = doc(db,uid,"profiledb")

    return new Promise(async(resolve,reject)=>{
        try{
            await updateDoc(ref,{level:1})
            resolve("升級成功")
        }
        catch(error){
            reject("發生錯誤")
        }
    })
}//升級level

export async function checkLevel(uid:string){
    const ref = doc(db,uid,"profiledb")

    return new Promise(async(resolve,reject)=>{
        try{
            const res = await getDoc(ref)
            const data :any = res.data()
            resolve(data.level)}
        catch{
            reject("發生錯誤")
        }
    })

}//確認level