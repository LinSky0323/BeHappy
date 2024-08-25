import { type NextRequest } from 'next/server'
const URL = "https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime"
const header:any = {"Content-Type":"application/json","x-api-key": process.env.PARTNER_KEY}

export async function POST(request: NextRequest){
    const body = await request.json()
    const prime = body.prime
    const name = body.order.name
    const phone = body.order.phone
    const price = body.order.price
    const uid = body.order.uid
    const email = body.order.email
    const data = {
        "prime": prime,
        "partner_key": process.env.PARTNER_KEY,
        "merchant_id": process.env.MERCHANT_ID,
        "details":uid+"levelUP",
        "amount": price,
        "cardholder": {
            "phone_number": phone,
            "name": name,
            "email": email,
            "zip_code": "",
            "address": "",
            "national_id": ""
        },
        "remember": true}
    const res = await fetch(URL,{
        method:"POST",
        headers:header,
        body:JSON.stringify(data)
    })
    const result = await res.json()
    if(result["status"]===0){
        return new Response('Pay success', {
            status: 200,
          })
    }
    else{
        return new Response('Pay fail', {
            status: 500,
          })
    }
}