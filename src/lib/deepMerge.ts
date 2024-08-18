

export default function DeepMerge(a:any,b:any){
    const result = {...a}
    for(const key in b){
        if(result.hasOwnProperty(key)){
            if(typeof result[key]  === "object" && typeof b[key]){
                result[key] = DeepMerge(result[key] as any,b[key] as any)
            }
        }
        else{
            result[key] = b[key]
        }
    }
    return result
}