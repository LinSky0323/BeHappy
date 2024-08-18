import Header from "@/component/header/header";
import Sign from "@/component/sign/sign";
import styles from "./page.module.css"


export default  function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.test}>
      我是首頁
      我的首頁打算要搭配成品的樣品圖做簡單介紹，但是後面都還沒做完，就先簡單文字介紹一下。</div>
      <div className={styles.test}>登入&信箱驗證之後 點擊上方的建立網頁，輸入每個資料，最後就能複製一份網址。</div>
      <div className={styles.test}>網址可以另外使用，但是如果要發送訂單，也需要登入並完成信箱驗證</div>
      <div className={styles.btn}><Sign/></div>
    </main>
  );
}
