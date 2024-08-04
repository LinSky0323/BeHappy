import Image from "next/image";
import styles from "./page.module.css";
import SubmitButton from "@/component/button/submitButton/submitButton";
import ProductCard from "@/component/productCard/productCard";
import Header from "@/component/header/header";
import Introduce from "@/component/introduce/introduce";
import DisplayBlock from "@/component/displayblock/displayblock";
import Booking from "@/component/booking/booking";


export default function Home() {

  return (
    <main>
      <Header title="我老婆最正" username="by.陳聖鎧"/>
      <Introduce src="/S__12706017.jpg" description="我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員
      我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員
      我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員我是測試員"/>
      <DisplayBlock/>
      <Booking/>
    </main>
  );
}
