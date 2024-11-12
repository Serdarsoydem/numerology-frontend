"use client"
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    ForgotPasswordFormInput,
    forgotPasswordSchema,
    LoginWithPasswordFormInput,
    loginWithPasswordSchema,
    ResetPasswordFormInput,
    resetPasswordSchema
} from "@/validations/login";
import {Button} from "@/components/ui/button";
import {Icons} from "@/utils/icons";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";


type FormInput =
    | LoginWithPasswordFormInput
    | ResetPasswordFormInput
    | ForgotPasswordFormInput;

type SchemaType<T extends string> = T extends "login" | "signup"
    ? LoginWithPasswordFormInput
    : T extends "reset-password"
        ? ResetPasswordFormInput
        : ForgotPasswordFormInput;

const Register =  (
    {
        operation,
        token
    } : {
        operation : "login" | "signup" | "reset-password" | "forgot-password",
        token : string | undefined
    }
) => {

    const [operationInProgress , setOperationInProgress] = useState(operation)
    const [isPending, startTransition] = React.useTransition()
    const { toast } = useToast()
    const router = useRouter()

    const schema =
        operationInProgress === "login" ? loginWithPasswordSchema :
            operationInProgress === "signup" ? loginWithPasswordSchema :
                operationInProgress === "forgot-password" ? forgotPasswordSchema :
                resetPasswordSchema;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SchemaType<typeof operationInProgress>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onLogin =  (data : LoginWithPasswordFormInput) => {
        console.log("On Login")

        startTransition( async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
                    {
                        method : "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            identifier : data.email,
                            password : data.password,
                        })
                    }
                )


                let result
                if (!response.ok){
                    const data = await response.json()
                    if(data.error.message === "Invalid identifier or password"){
                        toast({
                            title: "Giriş",
                            description: "Kullanıcı adı ve ya şifre hatalı",
                            variant: "destructive",
                        })
                    }
                    return
                }
                result = await response.json()
                    localStorage.setItem('token', result.jwt);
                    router.push('/'); // Redirect to a protected page
            } catch (error) {
                console.error('Registration error:', error);
                alert('Kayıt Başarısız Oldu!');
            }
        })
    };

    const onSignUp =  (data : LoginWithPasswordFormInput) => {
        console.log("On Sign")
        startTransition(  async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
                    {
                        method : "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email : data.email,
                            password : data.password,
                            username : data.email
                        })
                    }
                )

                if (!response.ok){
                    const data = await response.json()
                    toast({
                        title: "Giriş",
                        description: data.error,
                        variant: "destructive",
                    })
                    return
                }
                const result = await response.json()
                console.log(result)
                    localStorage.setItem('token', result.jwt);
                    router.push('/'); // Redirect to a protected page
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed!');
            }
        })
    };

    const onForgotPassword =  (data : ForgotPasswordFormInput) => {
        console.log("On Forgot")
        console.log(data)

        startTransition( async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`,
                    {
                        method : "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email : data.email,
                        })
                    }
                )

                let result
                if(response.ok) {
                    result = await response.json()
                    toast({
                        title: "Şifre Sıfırlama",
                        description: "Şifre sıfırlama talimatları e-posta adresinize gönderildi.",
                        variant: "default",
                    });
                    setOperationInProgress("login")
                }
                //    localStorage.setItem('token', response1);
                //  router.push('/dashboard'); // Redirect to a protected page
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed!');
            }
        })
    };

    const onResetPassword =  (data : ResetPasswordFormInput) => {
        console.log("onResetPassword")

        startTransition( async () => {
            try {
                console.log("on Reset")
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`,
                    {
                        method : "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token : token,
                            password : data.password,
                            passwordConfirmation : data.password
                        })
                    }
                )

                let result
                if(!response.ok) {
                    result = await response.json()
                    toast({
                        title: "Şifre Sıfırlama",
                        description: "Bir hata oluştu.",
                        variant: "destructive",
                    });
                }
                result = await response.json()
                toast({
                    title: "Şifre Sıfırlama",
                    description: "Şifreniz başarıyla güncellendi.",
                    variant: "default",
                });
                setOperationInProgress("login")
                  localStorage.setItem('token', result.jwt);
                  router.push('/'); // Redirect to a protected page
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed!');
            }
        })
    };

    const getHeading = () => {
        if (operationInProgress === "login") {
            return <h3 className="text-gray-800 text-4xl font-extrabold">Giriş Yap</h3>;
        } else if (operationInProgress === "signup") {
            return <h3 className="text-gray-800 text-4xl font-extrabold">Kaydol</h3>;
        } return <h3 className="text-gray-800 text-4xl font-extrabold">Şifre Oluştur</h3>;

    }

    return (
        <div className="font-[sans-serif] max-w-7xl mx-auto h-screen">
            <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                <div className="max-w-lg max-md:mx-auto w-full p-6">
                    <div className="mb-12">
                        {getHeading()}
                        <p className="text-gray-800 text-sm mt-6">Hayatın sana özel şifresi burada</p>
                    </div>
                    <form
                        onSubmit={handleSubmit((data) => {
                            if (operationInProgress === "login") {
                                onLogin(data as LoginWithPasswordFormInput);
                            } else if (operationInProgress === "signup") {
                                onSignUp(data as LoginWithPasswordFormInput);
                            } else if (operationInProgress === "forgot-password") {
                                onForgotPassword(data as ForgotPasswordFormInput);
                            } else if (operationInProgress === "reset-password") {
                                onResetPassword(data as ResetPasswordFormInput);
                            }
                        })}
                    >

                        {operationInProgress !== "reset-password" && (
                            <div className="grid gap-1 pb-4">
                                <Label htmlFor="email">E-mail</Label>
                                <Input {...register("email")} id="email" type="email" />
                                {errors.email && (
                                    <div className="text-xs text-red-600">{errors.email.message}</div>
                                )}
                            </div>
                        )}

                        {operationInProgress !== "forgot-password" && (
                            <div className="grid gap-1 pb-4">
                                <Label htmlFor="password">Şifre</Label>
                                <Input {...register("password")} id="password" type="password" />
                                {errors.password && (
                                    <div className="text-xs text-red-600">{errors.password.message}</div>
                                )}
                            </div>
                        )}

                        {operationInProgress === "login" && (
                            <div className="flex flex-wrap items-center gap-4 justify-between mt-4">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox"
                                           className="shrink-0 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"/>
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                                        Beni Hatırla
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <button onClick={() => setOperationInProgress("forgot-password")}
                                            className="text-blue-600 font-semibold hover:underline">
                                        Şifrenizi mi unuttunuz?
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="mt-8">
                            <Button disabled={isPending} className="ml-auto" type="submit">
                                {isPending ? (
                                    <Icons.spinner className="size-2 animate-spin" aria-hidden="true"/>
                                ) : (
                                    operationInProgress === "login" ? "Giriş" : operationInProgress === "signup" ? "Kaydol" : "Şifre Sıfırla"
                                )}
                            </Button>
                        </div>
                    </form>

                    {operationInProgress === "login" ? (
                        <p className="text-sm mt-8 text-center text-gray-800">Hesabınız yok mu?
                            <a onClick={() => setOperationInProgress("signup")}>
                                <button
                                    className="text-blue-600 font-semibold tracking-wide hover:underline ml-1">Kaydolun
                                </button>
                            </a>
                        </p>
                    ) : (
                        <p className="text-sm mt-8 text-center text-gray-800">Hesabınız var mı?
                            <a onClick={() => setOperationInProgress("login")}>
                                <button
                                    className="text-blue-600 font-semibold tracking-wide hover:underline ml-1">Giriş
                                    Yapın
                                </button>
                            </a>
                        </p>
                    )}
                </div>


                <div
                    className="md:h-full h-auto md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
                    <Image
                        src="/images/login-page-image.jpeg"
                        className="rounded-md"
                        fill
                        alt="Dining Experience"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
