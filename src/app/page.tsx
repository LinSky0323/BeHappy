
import styles from "./page.module.css"
import localFont from 'next/font/local'
import MyDisplay from "@/component/mydisplay/page";
import TeachTrade from "@/component/teachtrade/page";
import Homepage from "@/component/homepage/page";
const myFont = localFont({ src: './ChenYuluoyanThin.ttf' })




export default  function Home() {
  const day = new Date()
  const hour = day.getHours()

  return (
    <main className={styles.container}>
      <Homepage/>
      <MyDisplay/>
      <TeachTrade/>
    </main>
  );
}
