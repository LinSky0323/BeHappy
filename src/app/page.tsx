import Header from "@/component/header/header";
import Sign from "@/component/sign/sign";
import styles from "./page.module.css"
import Image from "next/image";
import StartBtn from "@/component/button/startButton/page";

import localFont from 'next/font/local'

const myFont = localFont({ src: './ChenYuluoyanThin.ttf' })




export default  function Home() {
  const day = new Date()
  const hour = day.getHours()

  return (
    <main className={styles.container}>
      <div className={styles.block}>
        <div className={styles.imgContainer}>
          <Image alt="背景" src="/background.jpg" fill style={{ objectFit: 'cover' }}/>
        </div>
        <div className={styles.people}>
          <Image alt="人" src="/people.png" width={100} height={100} style={{ objectFit: 'cover' }}/>
        </div>
        <div className={styles.tree}>
          <Image alt="樹" src="/tree.png" width={250} height={300} style={{ objectFit: 'cover' }}/>
        </div>
        <div className={styles.castle}>
          <Image alt="城堡" src = "/castle.png" width={400} height={400} style={{ objectFit: 'cover' }}/>
        </div>
        <div className={styles.sun}>
          <Image alt="太陽" src = "/sun.png" width={250} height={200} style={{ objectFit: 'cover' }}/>
        </div>
        <div className={styles.title}>
          <div><h1 className={styles.h1}>喜悦網頁製作</h1></div>
          <div className={styles.btn}><Sign/></div>
        </div>
        <div className={`${styles.text1} ${myFont.className}`}>一個人</div>
        <div className={`${styles.text2} ${myFont.className}`}>也能做出一棟城堡！</div>
        <StartBtn/>
        <div className={styles.bl}></div>
      </div>
    </main>
  );
}
