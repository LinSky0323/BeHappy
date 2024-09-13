"use client"
import Image from "next/image"
import styles from "./page.module.css"

export default function Homepage(){
    return(
        <main className={styles.container}>
            <div className={styles.godenback}>
                <Image alt="goden" src = "/goden_back.png" fill sizes="100%" style={{objectFit:"cover",zIndex:1}}/>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.text1}>Be - Happy</div>
                <div className={styles.text2}>喜悅網頁製作</div>
                <div className={styles.text3}>讓個人工作者可以編輯一個展示自己作品、提供客人預約的網頁</div>
            </div>


            <div className={styles.cardContainer}>
            <div className={`${styles.card} `}>
                <Image alt="fast" src = "/fast.png" width={48} height={48} style={{objectFit:"cover"}}/>
                <div className={styles.cardtext}>Fast</div>
            </div>
            <div className={`${styles.card} `}>
                <Image alt="easy" src = "/easy.png" width={48} height={48} style={{objectFit:"cover"}}/>
                <div className={styles.cardtext}>Easy</div>
            </div>
            <div className={`${styles.card} `}>
                <Image alt="showcase" src = "/showcase.png" width={48} height={48} style={{objectFit:"cover"}}/>
                <div className={styles.cardtext}>Showcase Yourself</div>
            </div>
            <div className={`${styles.card} `}>
                <Image alt="appointment" src = "/appointment.png" width={48} height={48} style={{objectFit:"cover"}}/>
                <div 
                className={styles.cardtext}>Offer Appointments</div>
            </div>
            </div>
        </main>
    )
}

// import Image from "next/image"
// import styles from "./page.module.css"
// import { useSpring, animated,config} from "@react-spring/web"
// import { transform } from "next/dist/build/swc"
// import StartBtn from "../button/startButton/page"
// import { useEffect } from "react"
// import Sign from "../sign/sign"

// const leftfrom = ()=>({from:{transform:"rotate(0deg)"}})
// const rightfrom = ()=>({from:{transform:"rotate(0deg)"}})
// const leftto = ()=>({transform:"rotate(1080deg)",config:{duration:5500}})
// const rightto = ()=>({transform:"rotate(-1080deg)",config:{duration:5500}})
// const contentfrom = ()=>({scale:0,y:0,x:0,z:0})
// const contentto = ()=>({scale:4,y:-400,x:-250,z:100,config: { tension: 100, friction: 50 },delay:2000})
// const contentto800 = ()=>({scale:4,y:-400,x:-100,z:100,config: { tension: 100, friction: 50 },delay:2000})
// const castlefrom = ()=>({opacity:1})
// const castleto = ()=>({opacity:0.3,delay:3000,config:{duration:3000}})
// const startfrom = ()=>({opacity:0})
// const startto = ()=>({opacity:1,delay:4000,config:config.slow})
// const arrowfrom = ()=>({rotate:-45,x:0,y:0,opacity:1})
// const arrowto = ()=>({rotate:-45,x:10,y:-10,config:{duration:1000},loop:{reverse:true}})

// export default function Homepage(){
//     const [door,setdoor] = useSpring(()=>({from:{transform:"perspective(1000px) rotateX(0deg)"}})) 
//     const [gear1,setgear1] = useSpring(()=>leftfrom())
//     const [gear2,setgear2] = useSpring(()=>leftfrom())
//     const [gear3,setgear3] = useSpring(()=>leftfrom())
//     const [gear4,setgear4] = useSpring(()=>rightfrom())
//     const [gear5,setgear5] = useSpring(()=>rightfrom())
//     const [gear6,setgear6] = useSpring(()=>rightfrom())
//     const [content,setContent] = useSpring(()=>contentfrom())
//     const [castle,setCastle] = useSpring(()=>castlefrom())
//     const [start,setStart] = useSpring(()=>startfrom())
//     const [arrow,setArrow] = useSpring(()=>({from:arrowfrom()}))
    
//     const handleClick = ()=>{
//         setdoor.start({transform:"perspective(1000px) rotateX(-90deg)",config: { duration:2000}})
//         setgear1.start(rightto())
//         setgear2.start(leftto())
//         setgear3.start(rightto())
//         setgear4.start(leftto())
//         setgear5.start(rightto())
//         setgear6.start(leftto())
//         if(window.innerWidth<800){setContent.start(contentto800())}
//         else{setContent.start(contentto())}
//         setCastle.start(castleto())
//         setStart.start(startto())
//         setArrow.stop()
//         setArrow.start(()=>({opacity:0}))
//     }   
//     useEffect(()=>{
//         setArrow.start(arrowto())
//     },[])
    
//     return(
//         <main className={styles.container}>

//             <video id="background-video" autoPlay muted loop playsInline style={{position: "absolute",top:"0",left:"0",width:"100%",height:"100%",objectFit:"cover",zIndex:"0",opacity:0.4}}>
//                 <source src = "/backstar.mp4" type="video/mp4"/>
//             </video>

//             <div className={styles.title}>
//                 <div><h1 className={styles.h1}>喜悦網頁製作</h1></div>
//                 <div className={styles.btn}><Sign/></div>
//             </div>

//             <div className={styles.light}></div>
//             <animated.div className={styles.door} onClick={handleClick} style={door}></animated.div>
           

//             <animated.div className={styles.arrow} style={arrow}>
//                 <Image alt="arrow" src="/arrow.png" width={70}height={50}/>
//             </animated.div>

//             <div className={styles.gearContainer}>
//                 <div className={styles.gearContainer1}>
//                     <animated.div className={styles.gear1} style={gear1}>
//                         <Image alt="gear" src="/gear1.png" width={80} height={80}/>
//                     </animated.div>
//                     <animated.div className={styles.gear2} style={gear2}>
//                         <Image alt="gear" src="/gear2.png" width={80} height={80}/>
//                     </animated.div>
//                     <animated.div className={styles.gear3} style={gear3}>
//                         <Image alt="gear" src="/gear3.png" width={45} height={45}/>
//                     </animated.div>
//                 </div>
//                 <div className={styles.gearContainer2}>
//                     <animated.div className={styles.gear4} style={gear4}>
//                         <Image alt="gear" src="/gear3.png" width={45} height={45}/>
//                     </animated.div>
//                     <animated.div className={styles.gear5} style={gear5}>
//                         <Image alt="gear" src="/gear2.png" width={80} height={80}/>
//                     </animated.div>
//                     <animated.div className={styles.gear6} style={gear6}>
//                         <Image alt="gear" src="/gear1.png" width={80} height={80}/>
//                     </animated.div>
//                     </div>
//             </div>
            
//             <animated.div className={styles.content} style={content}>
//                 <div>一個人</div>
//                 <div style={{marginLeft:"10px"}}>也能做出一棟城堡！</div>
//             </animated.div>
            

            
//             <animated.div className={styles.castle} style={castle}>
//             <Image alt="background" src="/back_castle.png" fill sizes="100%" style={{objectFit:"contain",objectPosition:"bottom"}}/>
//             </animated.div>
//             <animated.div className={styles.startbtn} style={start}>
//                 <StartBtn/>
//                 <div className={styles.btnmask}></div>
//             </animated.div>
//         </main>
//     )
// }