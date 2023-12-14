"use server"

import { Resend } from "resend";
import { validateString } from "@/lib/utils";
import { getErrorMessage } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async (formData: FormData) => {
    const message = formData.get('message');
    const senderEmail = formData.get('senderEmail');

    if (!validateString(message, 5000)) {
        return {
            error: "Invalid message"
        };
    }

    if (!validateString(senderEmail, 500)) {
        return {
            error: "Invalid sender email"
        };
    }

    try{
        await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: "rameel668@googlemail.com",
            subject: "New message from portfolio",
            reply_to: senderEmail as string,
            text: message as string,
        });
    } catch (error: any) {
        return{
            error: getErrorMessage(error)
        }
    }   
};