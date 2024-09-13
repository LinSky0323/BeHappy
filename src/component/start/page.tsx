"use client"
import { useInView, animated, config} from "@react-spring/web"
import styles from "./page.module.css"
import StartBtn from "../button/startButton/page"

export default function Start(){
    const [ref,spring] = useInView(()=>({
        from:{
            opacity:0,
            y:50,
            x:"-50%"
        },
        to:{
            opacity:1,
            y:0,
            x:"-50%",
            config:config.wobbly,
        }
    }),{
        rootMargin: '-10% 0px -10% 0px',
    })
    const [ref1,spring1] = useInView(()=>({
        from:{
            opacity:0,
            y:50,
        },
        to:{
            opacity:1,
            y:0,
            config:config.wobbly,
            delay:500
        }
    }),{
        rootMargin: '-20% 0px -20% 0px',
    })
    const [ref2,spring2] = useInView(()=>({
        from:{
            opacity:0,
            y:50,
        },
        to:{
            opacity:1,
            y:0,
            config:config.wobbly,
            delay:1000
        }
    }),{
    })


    return(
        <div className={styles.container}>
            <animated.div ref = {ref} style={spring} className={styles.btnContainer}>
                <StartBtn/>
            </animated.div>
            <animated.div ref = {ref1} style={spring1} className={styles.text1}>
                別再用 FB、IG、LINE 跟客戶約時間了
            </animated.div>
            <animated.div ref = {ref2} style={spring2} className={styles.text2}>
               快來試試 <span className={styles.text3}> Be-Happy </span> 吧！
            </animated.div>
        </div>
    )
}