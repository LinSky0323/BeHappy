
import { checkAuth } from "./firebase/firaAuth"

export  function Agree(){
    const uid = localStorage.getItem("uid")
    const url = (window.location.pathname).split("/")[2]
    const i = window.location.protocol+window.location.host
    if(uid !== url){
        window.location.href = "/"
    }
    return true
   
}