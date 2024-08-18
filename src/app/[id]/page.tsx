import Booking from "@/component/booking/booking";
import DisplayBlock from "@/component/displayblock/displayblock";
import Header from "@/component/header/header";
import Introduce from "@/component/introduce/introduce";
import { checkAuth } from "@/lib/firebase/firaAuth";
import { getListData, getTimeData } from "@/lib/firebase/firestore";
import { PersonPageProviders } from "@/lib/store/porvider";

export default async function PersonPage({params}:{params:{id:string}}){
    const data =  await getListData(params.id)
    const timeList = await getTimeData(params.id)
    const navList = [{name:"簡介",id:"introduce"},{name:"作品展示",id:"displayBlock"},{name:"預約",id:"bookingList"}]
    return(
        <PersonPageProviders>
            <main>
                <Header data={data} navList = {navList}/>
                <Introduce data={data}/>
                <DisplayBlock data={data}/>
                <Booking data={data} timeList={timeList}/>
            </main>
        </PersonPageProviders>

    )
}