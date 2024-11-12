"use client"

import {useToast} from "@/components/ui/use-toast";
import React from "react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Icons} from "@/utils/icons";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {sendContactMessage, SendContactMessageInput} from "@/validations/contact-form";
import {LoginWithPasswordFormInput} from "@/validations/login";
import {router} from "next/client";

export default function ContactMessage() {
    const { toast } = useToast();
    const [isPending, startTransition] = React.useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm<SendContactMessageInput>({
        resolver: zodResolver(sendContactMessage),
    });
    const onSubmit = async (data: SendContactMessageInput) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data : {
                        email: data.email,
                        title: data.title,
                        message : data.message,
                        name : data.name
                    }
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                toast({
                    title: 'Hata',
                    description: "Bir Hata Oluştu"+ result.error.message,
                    variant: 'destructive',
                });
                return;
            }
            toast({
                title: 'Başarılı',
                description: "Mesajınız İletilmiştir",
                variant: 'default',
            });
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return(
        <>
            <h1 className="text-3xl font-extrabold">Mesaj Gönderin</h1>
            <form  onSubmit={handleSubmit(onSubmit)}
                   className="ml-auo space-y-4">
                <Input  {...register('name')}  type='text' placeholder='İsim'
                       className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"/>
                {errors.name && (
                    <div className="text-xs text-red-600">{errors.name.message}</div>
                )}
                <Input  {...register('email')}  type='email' placeholder='Email'
                       className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"/>
                {errors.email && (
                    <div className="text-xs text-red-600">{errors.email.message}</div>
                )}
                <Input  {...register('title')}  type='text' placeholder='Konu'
                       className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"/>
                {errors.title && (
                    <div className="text-xs text-red-600">{errors.title.message}</div>
                )}
                <Textarea  {...register('message')}
                           placeholder='Mesajınız'
                          className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"></Textarea>
                {errors.message && (
                    <div className="text-xs text-red-600">{errors.message.message}</div>
                )}
                <Button
                    type="submit"
                    className="w-full h-[48px] gap-3 rounded-md mt-6"
                    disabled={isPending}
                >
                    {isPending ? (
                        <Icons.spinner className="animate-spin h-5 w-5"/>
                    ) : (
                        "Gönder"
                    )}
                </Button>
            </form>
        </>
    )
};
