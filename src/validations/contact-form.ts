import {z} from "zod";
import {emailSchema} from "@/validations/login";


export const sendContactMessage = z
    .object({
        email: emailSchema,
        message: z.string(),
        title: z.string(),
        name: z.string()
    })

export type SendContactMessageInput = z.infer<
    typeof sendContactMessage
>
