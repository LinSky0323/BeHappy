"use client"
import FormTitle from "@/component/form/title"
import ProfileForm from "@/component/form/profileForm/page"




export default function Profile (){

    return(
        <div>
            <FormTitle name="您的個人資訊"/>
            <ProfileForm/>
        </div>
    )
}