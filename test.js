// let data = [{"染髮":[{img:"XX.jps",des:"紫色的頭"},{img:"XX.jps",des:"藍色的頭"},{img:"XX.jps",des:"紅色的頭"}]},{"燙髮":[]}]
// console.log(Object.keys(data))

// let data = [{"item1":[{src:"/S__12706017.jpg",description:"test1"},{src:"/S__12706017.jpg",description:"test2"}]},{"item2":[{src:"/S__12706017.jpg",description:"test4"},{src:"/S__12706017.jpg",description:"test3"}]}]
// const testTitle = data.map((item)=>(Object.keys(item)))
// console.log(testTitle[0][0])

// let data = [2024,2,1]
// const ans = new Date(data)
// console.log(ans)

// let start = 10;
// let end = 22;
// let time = {}
// let gap = end-start
// for(let i=0;i<gap*2;i++){
//     let item = start+i*0.5
//     time[item] = null
// }
// console.log(time)

// const test = {2024:{
//     1:{1:{
//         '10': null,
//         '11': null,
//         '12': null,
//         '13': null,
//         '14': null,
//         '15': null,
//         '16': null,
//         '17': null,
//         '18': null,
//         '19': null,
//         '20': null,
//         '21': null,
//         '10.5': null,
//         '11.5': null,
//         '12.5': null,
//         '13.5': null,
//         '14.5': null,
//         '15.5': null,
//         '16.5': null,
//         '17.5': null,
//         '18.5': null,
//         '19.5': null,
//         '20.5': null,
//         '21.5': null
//       },2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{},12:{},13:{},14:{},15:{},16:{},17:{},18:{},19:{},20:{},21:{},22:{},23:{},24:{},25:{},26:{},27:{},28:{},29:{},30:{},31:{}}
// }}

// console.log(test[2024][1][1].length())

// const Day = new Date(2024,0,5)
//     const year = Day.getFullYear()
//     const month = Day.getMonth()+1
//     const date = Day.getDate()
//     const day = Day.getDay()
//     const DateList = []
//     for(let i = 0;i<7;i++){
//         const data = `${(new Date(2024,0,5-day+i)).getMonth()+1}-${(new Date(2024,0,5-day+i)).getDate()}`
//         DateList.push(data)
//     }
//     console.log(DateList)

// const a = [{"item1":[{src:"/S__12706017.jpg",description:"test1"},{src:"/S__12706017.jpg",description:"test2"}]},{"item2":[{src:"/S__12706017.jpg",description:"test4"},{src:"/S__12706017.jpg",description:"test3"}]}]
// console.log(Object.keys(a))


const a = {2024:{8:{15:{1:{user:"ken",price:"2000"},2:{}}}}}
const b = {2024:{8:{15:{1:{},5:{}}}}}

const c = {user:"ken",price:"2000"}
const d = {}

let i = 0
function DeepMerge(a,b){
    let result = {...a}
    if(Object.keys(b).length===0){
        result = {}
    }
    for(const key in b){
        if(result.hasOwnProperty(key)){
            if(typeof result[key] === "object"){
                result[key] = DeepMerge(result[key],b[key])
            }
            else{
                result[key] = b[key]
            }
        }
        else{
            result[key] = b[key]
        }
    }
    return result

}


const data = DeepMerge(a,b)
console.log(data[2024])
