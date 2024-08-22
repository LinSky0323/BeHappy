import { type NextRequest } from 'next/server'
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest){
    const PASSWORD = process.env.SMTP_PASSWORD
    const MAIL = process.env.SMTP_MAIL
    const { to, subject, body } = await request.json();
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:MAIL,
            pass:PASSWORD
        }
    });
    try{
        await transport.sendMail({
            from:MAIL,
            to,
            subject,
            html:body
        })
        return new Response('Send success', {
            status: 200,
          })
    }
    catch(error){
        return new Response('Send fail', {
            status: 500,
          })
    }
    }