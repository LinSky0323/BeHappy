"use client"
import { useFormState } from "react-dom"
import styles from "./displayForm.module.css"
import SubmitButton from "@/component/button/submitButton/submitButton"
import {  createListData, getListData } from "@/lib/firebase/firestore"
import { useUserBuildDispatch, useUserBuildSelector } from "@/lib/store/hooks"
import { selectBuildList, setBuildList } from "@/lib/store/features/userBuildSlices"
import { useChangeValue } from "@/lib/hook/useChangeValue"
import { useChangeRemind } from "@/lib/hook/useChangeRemind"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import build from "next/dist/build"
import { UploadImg } from "@/lib/firebase/firestorage"
import { buildCreateApi } from "@reduxjs/toolkit/query"
import ProductCard from "@/component/productCard/productCard"

const TapColor = ["red","orange","yellow","green","blue","purple"]

export default function DisplayForm(){
    const buildList = useUserBuildSelector(selectBuildList)
    const tapinput = useChangeValue("")
    const nameinput = useChangeValue("")
    const tapRemind = useChangeRemind()
    const displayRemind = useChangeRemind() 
    const dispatch = useUserBuildDispatch()
    const [tapList,setTapList] = useState<string[]>(buildList?.displayList?.map((j)=>(Object.keys(j)[0])) || [])
    const [highTap,setHighTap] = useState([tapList[0],0])
    const [preview,setPreview] = useState("")
    const [previewCard,setPreviewCard] = useState<object[]>((buildList?.displayList?.length)?Object.values(buildList.displayList[0])[0] as object[]:[])
    const [arrow,setArrow] = useState(false)
    const fileInputRes = useRef<HTMLInputElement>(null)
    const tapRef = useRef<HTMLDivElement>(null)
    const uid = localStorage.getItem("uid") as string

    useEffect(()=>{
        if(!buildList?.displayList?.length){
            getListData(uid).then((item)=>{
                if(item){
                    dispatch(setBuildList(item))
                    let list = tapList
                    if(item.displayList){
                        item.displayList.map((i:any)=>(
                            list.push(Object.keys(i)[0])
                        ))
                    }
                    setTapList(list)
                    setHighTap([list[0],0])
                    if(item.displayList){
                        if(item.displayList[0])
                        setPreviewCard(Object.values(item.displayList[0])[0] as object[])
                    }
                    
                }
            })
        }
    },[])   
    
    useEffect(()=>{
        if(tapRef.current){
            const mutationObserver = new MutationObserver(()=>{
                if(tapRef.current){
                    const w = tapRef.current.clientWidth
                    const s = tapRef.current.scrollWidth
                    if(s-w>0){
                        setArrow(true)
                    }
                    else{
                        setArrow(false)
                    }
                }
            })
            mutationObserver.observe(tapRef.current,{childList:true,subtree:true})
            const w = tapRef.current.clientWidth
            const s = tapRef.current.scrollWidth
            if(s-w>0){
                setArrow(true)
            }
            else{
                setArrow(false)
            }
        }

    },[])

    const tapSubmit = async(prevState:any, formData:FormData)=>{
        const tap = formData.get("displayType") as string
        if(tap ){
            const newDisplayList = [...(buildList.displayList||[])]
            newDisplayList.push({[tap]:[]})
            const setData = {...buildList,displayList:newDisplayList}
            dispatch(setBuildList(setData))
            setTapList([...tapList,tap])
            const submitData = {displayList:newDisplayList}
            const res = await createListData(uid,submitData) as string
            tapRemind.setRemind(res)
            tapinput.setValue("")
            setHighTap([tap,newDisplayList.length-1])
            setPreviewCard([])
        }
    }
    const submit = async(prevState:any, formData:FormData)=>{
        const image = formData.get("displayImage") as File
        const name = formData.get("displayContent")
        if(image.name && name && highTap && buildList.displayList){
            const url = await UploadImg(image)
            const newList = [...buildList.displayList[highTap[1] as number][highTap[0]]]
            newList.push({src:url,description:name})
            const newObject = {...buildList.displayList[highTap[1] as number],[highTap[0]]:newList}
            const setData = [...buildList.displayList]
            setData[highTap[1] as number] = newObject
            const submitData = {displayList:setData}
            const dispatchData = {...buildList,displayList:setData}
            dispatch(setBuildList(dispatchData))
            const res = await createListData(uid,submitData) as string
            displayRemind.setRemind(res)
            if(fileInputRes.current){
                fileInputRes.current.value=""
            }
            setPreview("")
            nameinput.setValue("")
            setPreviewCard(newList)
        }
    }
    const tapDel = async(index:number)=>{
        const newDisplayList = [...(buildList.displayList||[])]
        newDisplayList.splice(index,1)
        const dispatchData = {...buildList,displayList:newDisplayList}
        const submitData = {displayList:newDisplayList}
        dispatch(setBuildList(dispatchData))
        await createListData(uid,submitData)
        tapRemind.setRemind("刪除成功")
        tapList.splice(index,1)
        setTapList(tapList)
        setHighTap([tapList[0],0])
        if(index===0 && tapList.length!==0 ){           
            setPreviewCard((buildList?.displayList?.length)?Object.values(buildList.displayList[1])[0] as object[]:[])
        }
        else if(tapList.length===0){
            setPreviewCard([])
        }
        else{
            setPreviewCard((buildList?.displayList?.length)?Object.values(buildList.displayList[0])[0] as object[]:[])
        }

    }
    const cardDel = async(index:number)=>{
        if(buildList.displayList){
            const newList = [...buildList.displayList[highTap[1] as number][highTap[0]]]
            newList.splice(index,1)
            const newObject = {...buildList.displayList[highTap[1] as number],[highTap[0]]:newList}
            const setData = [...buildList.displayList]
            setData[highTap[1] as number] = newObject
            const submitData = {displayList:setData}
            const dispatchData = {...buildList,displayList:setData}
            dispatch(setBuildList(dispatchData))
            const res = await createListData(uid,submitData) as string
            setPreviewCard(newList)
        }
        
    }
    const [tapstate,tapformAction] = useFormState(tapSubmit,null)
    const [state,formAction] = useFormState(submit,null)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files?.length){
            const file = event.target.files[0]
            if(file.type.startsWith("image/")){
                const reader = new FileReader();
                reader.onloadend = () =>{
                    setPreview(reader.result as string)
                }
                reader.readAsDataURL(file)
            }
        }
    }
    const clickTap = (item:string,index:number)=>{
        setHighTap([tapList[index],index])
        setPreviewCard((buildList?.displayList?.length)?Object.values(buildList.displayList[index])[0] as object[]:[])
    }
    const checkDelTap = (index:number,event:React.MouseEvent)=>{
        if(highTap[1]===index){
            event.stopPropagation()
            tapDel(index)
        }
    }
    const checkDelCard = (index:number)=>{
        cardDel(index)
    }

    let intervalID:any;
    const onScrollRight=()=>{
      intervalID=setInterval(()=>{
        if(tapRef.current){
            tapRef.current.scrollLeft = tapRef.current.scrollLeft+20;
        }
        
    },10) };
    const onScrollLeft=()=>{
      intervalID=setInterval(()=>{
        if(tapRef.current){
            tapRef.current.scrollLeft = tapRef.current.scrollLeft-20;
        }
    },10) };
    const leaveScroll=()=>{clearInterval(intervalID)}

    return(
        <>
         <form className={styles.form } action={tapformAction}>
            <label>添加作品種類：</label><input type="text" name="displayType" value={tapinput.value} onChange={tapinput.onChange}></input>
            <SubmitButton name="確認"/>
            {tapRemind.state && <div className={styles.remind}>{tapRemind.state}</div>}
        </form>
        {arrow && <>
                    <div className={styles.left} onMouseDown={onScrollLeft} onMouseUp={leaveScroll} onMouseLeave={leaveScroll} >
                        <div className={styles.la}></div>
                    </div>
                    <div className={styles.right} onMouseDown={onScrollRight} onMouseUp={leaveScroll} onMouseLeave={leaveScroll}>
                        <div className={styles.ra}></div>
                    </div>
                    </>}
        <div className={styles.tapContainer}>
            請選擇種類:<div className={styles.taplist}  ref={tapRef}>
            {tapList && tapList.map((item,index)=>(         
                    <div onClick={()=>clickTap(item,index)} key={index} className={`${styles.tap} ${styles[`${TapColor[index%6]}`]} ${index===highTap[1] && styles.high}`}>
                        {item}<div className={styles.delTap} onClick={(e)=>checkDelTap(index,e)}>x</div>
                    </div>
            ))}
            </div>
        </div>

        <div className={styles.cardContainer}>

            {previewCard && previewCard.map((item:any,index)=>(
                <div key={index} className={styles.card}>
                    <ProductCard description={item.description} src={item.src}/>
                    <div className={styles.delCard} onClick={()=>checkDelCard(index)}>x</div>
                </div>
            ))}

            {previewCard.length<4 &&
                <form className={styles.formCard}  action={formAction}>
                    <div className={styles.writecontainer}>
                        <div className={styles.writeimage}>
                            <div className={styles.imageContent}>
                                <div>
                                <label >作品展示圖：</label>
                                <label className={styles.selectFile} htmlFor="displayImage">選擇檔案</label>
                                <input type="file" id="displayImage" name="displayImage" ref={fileInputRes} onChange={handleChange} style={{display:"none"}} accept="image/*" ></input>
                                </div>
                                {(!preview) ?<div className={styles.filename}>未選擇任何檔案</div>:
                                <div className={styles.image}><Image src={preview} alt="預覽圖"  fill /></div> }
                            </div> 
                        </div>
                        <div className={styles.writename}>
                            <label>作品名稱：</label><input type="text" name="displayContent" value={nameinput.value} onChange={nameinput.onChange}></input>
                        </div>
                    </div>
                    <div style={{display:"flex"}}>
                        {displayRemind.state && <div className={styles.remind}>{displayRemind.state}</div>}
                        <SubmitButton name="確認"/>
                    </div>
                </form>
            }
        </div>
        </>
       
    )
}