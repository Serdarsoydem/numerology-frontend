import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginWithPasswordFormInput, loginWithPasswordSchema } from '@/validations/login';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import {Icons} from "@/utils/icons";
import {useAuth} from "@/contexts/auth-context";

interface LoginFormProps {
    setOperationInProgress: (operation: 'login' | 'signup' | 'forgot-password' | 'reset-password') => void;
}


export const LoginForm = ({setOperationInProgress} : LoginFormProps) => {
    const { login } = useAuth();
    const [isPending, startTransition] = React.useTransition();
    const { toast } = useToast();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginWithPasswordFormInput>({
        resolver: zodResolver(loginWithPasswordSchema),
    });

    const onSubmit = async (data: LoginWithPasswordFormInput) => {
        try {
            console.log("Trying to login")
            await login(data)
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-12">
                <h3 className="text-gray-800 text-4xl font-extrabold">Giriş Yap</h3>
                <p className="text-gray-800 text-sm mt-6">Hayatın sana özel şifresi burada</p>
            </div>
            <div className="grid gap-1 pb-4">
                <Label htmlFor="email">E-mail</Label>
                <Input {...register('email')} id="email" type="email"/>
                {errors.email && (
                    <div className="text-xs text-red-600">{errors.email.message}</div>
                )}
            </div>
            <div className="grid gap-1 pb-4">
                <Label htmlFor="password">Şifre</Label>
                <Input {...register('password')} id="password" type="password"/>
                {errors.password && (
                    <div className="text-xs text-red-600">{errors.password.message}</div>
                )}
            </div>
            <div className="flex flex-wrap items-center gap-4 justify-between mt-4">
                <div className="text-sm">
                    <button
                        onClick={() => setOperationInProgress("forgot-password")}
                        type="button"
                        className="font-medium text-sm text-gray-800 hover:opacity-75"
                    >
                        Şifrenizi mi unuttunuz?
                    </button>
                </div>
                <div className="text-sm">
                    <button
                        onClick={() => setOperationInProgress("signup")}
                        type="button"
                        className="font-medium text-sm text-gray-800 hover:opacity-75"
                    >
                        Hesabınız yok mu?
                    </button>
                </div>
            </div>
            <Button
                type="submit"
                className="w-full h-[48px] gap-3 rounded-md mt-6 "
                disabled={isPending}
            >
                {isPending ? (
                    <Icons.spinner className="animate-spin h-5 w-5"/>
                ) : (
                    "Giriş Yap"
                )}
            </Button>
        </form>
    );
};
