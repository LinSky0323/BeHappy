
import styles from "./page.module.css"
import localFont from 'next/font/local'
import TeachTrade from "@/component/teachtrade/page";
import Homepage from "@/component/homepage/page";
import Sign from "@/component/sign/sign";
import StickyBar from "@/component/bar/stickybar/page";
import TradeDisplay from "@/component/mydisplay/tradedisplay/page";
import GuestDisplay from "@/component/mydisplay/gusetdisplay/page";
import Start from "@/component/start/page";
const myFont = localFont({ src: './ChenYuluoyanThin.ttf' })




export default  function Home() {
  const day = new Date()
  const hour = day.getHours()

  return (
    <main className={styles.container}>
      <StickyBar/>
      <Homepage/>
      <TradeDisplay/>
      <GuestDisplay/>
      <TeachTrade/>
      <Start/>
    </main>
  );
}
