"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordFormInput, forgotPasswordSchema } from '@/validations/login';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {Icons} from "@/utils/icons";

interface ForgotPasswordFormProps {
    setOperationInProgress: (operation: 'login' | 'signup' | 'forgot-password' | 'reset-password') => void;
}

export const ForgotPasswordForm = ({setOperationInProgress} : ForgotPasswordFormProps) => {
    const { toast } = useToast();
    const [isPending, startTransition] = React.useTransition();
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormInput>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormInput) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                }),
            });

            if (response.ok) {
                toast({
                    title: 'Şifre Sıfırlama',
                    description: 'Şifre sıfırlama talimatları e-posta adresinize gönderildi.',
                    variant: 'default',
                });
            } else {
                toast({
                    title: 'Şifre Sıfırlama',
                    description: 'Bir hata oluştu.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Forgot password error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-12">
                <h3 className="text-gray-800 text-4xl font-extrabold">Şifre Oluştur</h3>
                <p className="text-gray-800 text-sm mt-6">Hayatın sana özel şifresi burada</p>
            </div>
            <div className="grid gap-1 pb-4">
                <Label htmlFor="email">E-mail</Label>
                <Input {...register('email')} id="email" type="email"/>
                {errors.email && (
                    <div className="text-xs text-red-600">{errors.email.message}</div>
                )}
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-end mt-4">
                <div className="text-sm">
                    <button
                        onClick={() => setOperationInProgress("login")}
                        type="button"
                        className="font-medium text-sm text-gray-800 hover:opacity-75"
                    >
                        Giriş Yap
                    </button>
                </div>
            </div>
            <Button
                type="submit"
                className="w-full h-[48px] gap-3 rounded-md mt-6"
                disabled={isPending}
            >
                {isPending ? (
                    <Icons.spinner className="animate-spin h-5 w-5"/>
                ) : (
                    "Şifreyi Sıfırla"
                )}
            </Button>
        </form>
    );
};
