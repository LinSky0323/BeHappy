import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebaseApp";

export async function UploadImg(img:File):Promise<string>{
    const storageRef = ref(storage,"images/"+img.name)
    const uploadTask = uploadBytesResumable(storageRef,img)

    return new Promise<string>((resolve,reject)=>{
        uploadTask.on('state_changed',
            (snapshot)=>{
                console.log('Upload is done')
            },
            (error)=>{
                console.error('Upload failed:', error);
                reject(error)
            },
            async()=>{
                try{
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(url)
                }
                catch(error){
                    reject(error)
                }
            })
    })

    
}
