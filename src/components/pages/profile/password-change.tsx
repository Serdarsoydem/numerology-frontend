import {useForm} from "react-hook-form";
import {PasswordChangeFormInputs, passwordChangeSchema} from "@/validations/update-user";
import {zodResolver} from "@hookform/resolvers/zod";
import {strapiEndpoint} from "@/utils/endpoints";
import {toast} from "@/components/ui/use-toast";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Save} from "lucide-react";
import React, {useState} from "react";
import {useAuth} from "@/contexts/auth-context";

export default function PasswordChange () {
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const {fetchWithAuth} = useAuth()

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        reset
    } = useForm<PasswordChangeFormInputs>({
        resolver: zodResolver(passwordChangeSchema)
    });

    const handlePasswordChange = async (data: PasswordChangeFormInputs) => {
        try {
            const res = await fetchWithAuth(`${strapiEndpoint}/users-permissions/changePassword`, {
                method: 'POST',
                body: JSON.stringify({
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword
                })
            });

            if (!res.ok) {
                toast({
                    variant: "destructive",
                    title: "Şifre Değişikliği Başarısız",
                    description: "Mevcut şifrenizi kontrol edin"
                });
                return;
            }

            toast({
                variant: "default",
                title: "Şifre Başarıyla Değiştirildi"
            });

            setIsChangingPassword(false);
            reset(); // Clear form after successful change
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Bir Hata Oluştu",
                description: "Lütfen daha sonra tekrar deneyin"
            });
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-4">
            <button
                onClick={() => setIsChangingPassword(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
                Şifreyi Değiştir
            </button>

            {isChangingPassword && (
                <form onSubmit={handlePasswordSubmit(handlePasswordChange)} className="mt-4 space-y-4">
                    <div>
                        <Label className="block text-sm font-medium text-gray-700">Mevcut Şifre</Label>
                        <Input
                            type="password"
                            {...registerPassword("currentPassword")}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                        {passwordErrors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {passwordErrors.currentPassword.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700">Yeni Şifre</Label>
                        <Input
                            type="password"
                            {...registerPassword("newPassword")}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                        {passwordErrors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {passwordErrors.newPassword.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700">Yeni Şifreyi Onayla</Label>
                        <Input
                            type="password"
                            {...registerPassword("confirmPassword")}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                        {passwordErrors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {passwordErrors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            <Save className="w-5 h-5 mr-2"/> Şifreyi Değiştir
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setIsChangingPassword(false);
                                reset();
                            }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            İptal Et
                        </Button>
                    </div>
                </form>
            )}
        </div>
    )
}
