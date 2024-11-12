"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordFormInput, resetPasswordSchema } from '@/validations/login';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {Icons} from "@/utils/icons";

interface ResetPasswordFormProps {
    setOperationInProgress: (operation: 'login' | 'signup' | 'forgot-password' | 'reset-password') => void;
    token : string
}
export const ResetPasswordForm = ({ token, setOperationInProgress } : ResetPasswordFormProps) => {
    const [isPending, startTransition] = React.useTransition();
    const { toast } = useToast();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormInput>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordFormInput) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    password: data.password,
                    passwordConfirmation: data.password,
                }),
            });

            if (response.ok) {
                toast({
                    title: 'Şifre Sıfırlama',
                    description: 'Şifreniz başarıyla güncellendi.',
                    variant: 'default',
                });
                router.push('/');
            } else {
                toast({
                    title: 'Şifre Sıfırlama',
                    description: 'Bir hata oluştu.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Reset password error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-12">
                <h3 className="text-gray-800 text-4xl font-extrabold">Şifre Oluştur</h3>
                <p className="text-gray-800 text-sm mt-6">Hayatın sana özel şifresi burada</p>
            </div>
            <div className="grid gap-1 pb-4">
                <Label htmlFor="password">Yeni Şifre</Label>
                <Input {...register('password')} id="password" type="password"/>
                {errors.password && (
                    <div className="text-xs text-red-600">{errors.password.message}</div>
                )}
            </div>
            <Button
                type="submit"
                className="w-full h-[48px] gap-3 rounded-md mt-6"
                disabled={isPending}
            >
                {isPending ? (
                    <Icons.spinner className="animate-spin h-5 w-5" />
                ) : (
                    "Şifreyi Güncelle"
                )}
            </Button>
        </form>
    );
};
