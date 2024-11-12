import {z} from "zod";

export const passwordSchema = z
    .string({
        required_error: "Şifre Girilmek Zorundadır",
        invalid_type_error: "Şifreniz kurallara uygun değildir",
    })
    .min(8, {
        message: "Şifreniz en az 6 karekter olmalıdır",
    })
    .max(60, {
        message: "En Fazla 60 karekterli bir şifre olabilir",
    }).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/,
        {
            message:
                "Şifre bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter olmak üzere en az 8 karakter içermelidir",
        }
    )

export const emailSchema = z
    .string({
        required_error: "Email gereklidir",
        invalid_type_error: "Email formatı hatalıdır",
    })
    .min(5, {
        message: "Geçerli bir Email giriniz",
    })
    .max(64, {
        message: "Geçerli bir Email giriniz",
    })
    .email({
        message: "Geçerli bir Email giriniz",
    })


export const loginWithPasswordSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema
    })

export const resetPasswordSchema = z.object({
    password : passwordSchema
})

export const forgotPasswordSchema = z.object({
    email : emailSchema
})

export type LoginWithPasswordFormInput = z.infer<
    typeof loginWithPasswordSchema
>

export type ResetPasswordFormInput = z.infer<
    typeof resetPasswordSchema
>

export type ForgotPasswordFormInput = z.infer<
    typeof forgotPasswordSchema
>

