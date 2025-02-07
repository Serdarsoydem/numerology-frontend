import {z} from "zod";


export const updateUserSchema = z.object({
    email: z.string().optional(),
    name: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
})

export const passwordChangeSchema = z.object({
    currentPassword: z.string().min(1, { message: "Current password is required" }),
    newPassword: z.string()
        .min(8, { message: "New password must be at least 6 characters long" }),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreleriniz Aynı Değil",
    path: ["confirmPassword"]
});


export type PasswordChangeFormInputs = z.infer<typeof passwordChangeSchema>;


export type UserProfileType = z.infer<
    typeof updateUserSchema
>
