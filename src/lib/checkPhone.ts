export default function CheckPhone(number:string){
    const phoneRegex = /^09\d{8}$/;
    const result = phoneRegex.test(number)
    return result
}