"use client"
import { useFormStatus } from "react-dom"
import styles from "./submitButton.module.css"



export default function SubmitButton({name}:{name:string}){
    const {pending} = useFormStatus()

    return(
        <button type="submit" aria-disabled={pending} className={styles.button}>
            {name}
        </button>
    )
}
