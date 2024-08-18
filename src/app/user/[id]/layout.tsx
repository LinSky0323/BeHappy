import Header from "@/component/header/header";
import { UserBuildProviders } from "@/lib/store/porvider";
import styles from "./layout.module.css"
import LeftBar from "@/component/bar/leftbar/leftbar";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const navList = [{name:"個人資料",id:"userProfile"},{name:"建立網頁",id:"build"},{name:"訂單查詢",id:"bookingList"}]
    return ( 
        <UserBuildProviders>
            <Header title="喜悅網頁製作" username="鎧" navList={navList}/>
            <section className={styles.container}>
                {children}
            </section>  
        </UserBuildProviders>
    );
  }