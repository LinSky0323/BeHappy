import schedulestyles from "../component/schedule/schedule.module.css"
import daystyles from "../component/daySchedule/daySchedule.module.css"
interface Myobject{
    [key:string]:any;
}


export class SelectDay{
    public isSelect :boolean
    public isClick :boolean
    public selectDay :Myobject
    
    constructor(isSelect:boolean = false,isClick:boolean = false,selectDay:Myobject = {}){
        this.isSelect = isSelect
        this.selectDay = selectDay
        this.isClick = isClick
    }

    handleMouseDown(e:React.MouseEvent<HTMLDivElement>){
        const target = e.target as HTMLDivElement
        const data = target.innerText
        const newSelectDay = {...this.selectDay}
        this.isClick = true
        if(data){
            if(newSelectDay[data]){
                delete newSelectDay[data]
                target.classList.remove(schedulestyles.choose)
            }
            else{
                this.isSelect = true
                newSelectDay[data] = {}
                target.classList.add(schedulestyles.choose)
            }
            this.selectDay = newSelectDay
        }
    }
    handleMouseOver(e:React.MouseEvent<HTMLDivElement>){
        const target = e.target as HTMLDivElement
        const data = target.innerText
        const newSelectDay = {...this.selectDay}
        if((this.isSelect === true) && data){
            newSelectDay[data] = {}
            target.classList.add(schedulestyles.choose)
            this.selectDay = newSelectDay
        }
    }
    handleMouseUp(){
        this.isSelect = false
        this.isClick = false
    }

    reset(){
        this.selectDay = {}
    }
    selectedDay(y:any,m:any){
        return {[y]:{[m]:this.selectDay}}
    }
}

export class SelectHour{
    public isSelect :boolean
    public selectHour :Myobject
    public isClick :boolean
    
    constructor(isSelect:boolean = false,isClick:boolean = false,selectHour:Myobject = {}){
        this.isSelect = isSelect
        this.selectHour = selectHour
        this.isClick = isClick
    }

    handleMouseDown(e:React.MouseEvent<HTMLTableCellElement>){
        const target = e.target as HTMLTableCellElement
        const data = target.getAttribute("data-content")
        const newSelectHour = {...this.selectHour}
        this.isClick = true
        if(data){
            if(newSelectHour[data]){
                delete newSelectHour[data]
                target.classList.remove(daystyles.choose)
            }
            else{
                this.isSelect = true
                newSelectHour[data] = {}
                target.classList.add(daystyles.choose)
            }
            this.selectHour = newSelectHour
        }
    }
    handleMouseOver(e:React.MouseEvent<HTMLTableCellElement>){
        const target = e.target as HTMLTableCellElement
        const data = target.getAttribute("data-content")
        const newSelectHour = {...this.selectHour}
        if((this.isSelect === true) && data){
            newSelectHour[data] = {}
            target.classList.add(daystyles.choose)
            this.selectHour = newSelectHour
        }
    }
    handleMouseUp(){
        this.isSelect = false
        this.isClick = false
    }

    reset(){
        this.selectHour = {}
    }
    selectedDay(y:any,m:any){
        return {[y]:{[m]:this.selectHour}}
    }
}