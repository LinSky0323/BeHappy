import {app} from "./firebaseApp"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut, sendEmailVerification, getAuth, updateProfile } from "firebase/auth";
import { setProfile } from "./firestore";

export function checkAuth(){
    const auth = getAuth()
    return new Promise((resolve,reject)=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                if(user.emailVerified){
                    resolve({user,uid:user.uid})
                    unsubscribe()
                }
                else{
                    reject("信箱未驗證")
                }
            }
            else{
                reject("未登入")
            }
        })
    })
}

export function signAuth(name:string,email:string,password:string){
    const auth = getAuth(app)
    return new Promise((resolve,reject)=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            if(userCredential){
                //寄驗證信
                sendEmailVerification(userCredential.user)
                .then(()=>{
                    console.log("驗證信已寄出")
                }).catch((error)=>{
                    console.log(error)})
                //設定名稱
                updateProfile(userCredential.user,{
                    displayName:name
                }).then(()=>{
                    console.log("使用者名稱設定成功")
                }).catch((error)=>{console.log(error)})
                resolve({ok:true,uid:userCredential.user.uid})
            }
        })
        .catch((error)=>{
            reject({ok:false,message:error.message})
        })
    })
}

export async  function sendEmailAuth(){
    const auth = getAuth()
    return new Promise((resolve,reject)=>{
        if(auth.currentUser){
            sendEmailVerification(auth.currentUser).then(()=>{
                resolve("寄送成功")
            }).catch((error)=>{
                reject("寄送失敗")
            })
        }
    })
    
}

export async function loginAuth(email:string,password:string){
    const auth = getAuth(app)
    return new Promise((resolve,reject)=>{
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        const user = userCredential.user;
        if(user.emailVerified){
            resolve({ok:true,uid:userCredential.user.uid})
        }
        else{
            reject("信箱尚未驗證")
        }
        })
    .catch((error) => {
        const errorCode = error.code;
        reject("登入失敗")
        });
    })
}

export async function logoutAuth(){
    const auth = getAuth()
    return new Promise((resolve,reject)=>{
        signOut(auth).then((userCredential)=>{
            resolve("已登出")
        }).catch((error)=>{
            reject("登出失敗:"+error.message)
        })
    })
}