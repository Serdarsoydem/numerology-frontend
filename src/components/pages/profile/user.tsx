"use client";

import { Edit, Save, User } from "lucide-react";
import React, {startTransition, useEffect, useState} from "react";
import { useAuth } from "@/contexts/auth-context";
import { strapiEndpoint } from "@/utils/endpoints";
import { updateUserSchema, UserProfileType } from "@/validations/update-user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordChange from "@/components/pages/profile/password-change";

export default function UserProfile() {
    const { fetchWithAuth } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<UserProfileType | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserProfileType>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            phoneNumber: "",
        },
    });

    // Update form values when profile changes
    useEffect(() => {
        if (profile) {
            reset(profile);
        }
    }, [profile, reset]);

    // Fetch user profile
    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            fetchWithAuth(`${strapiEndpoint}/users/me`).then((user) => {
                console.log("Fetched user profile:", user);
                setProfile(user);
            });
        }
        return () => {
            ignore = true;
        };
    }, [fetchWithAuth]);

    const handleSaveProfile = (data: UserProfileType) => {
        console.log("Saving profile data:", data);
        startTransition(async () => {
          const res = await fetchWithAuth(`${strapiEndpoint}/users-permissions/updateMe`, {
            method: "PATCH",
            body: JSON.stringify(data),
          });
          if (!res.ok) {
            toast({
              variant: "destructive",
              title: "Başarısız",
              description: "Bir şeyler Yanlış Gitti. Sonra Tekrar Deneyiniz",
            });
            return;
          }
          const updatedProfile = await res.json();
          setProfile(updatedProfile);
          toast({
            variant: "default",
            title: "Başarılı",
            description: "Profiliniz Başarıyla Güncellendi",
          });
        });
        setIsEditing(false);
    };

    if (!profile) return null;

    return (
        <>
            <div className="bg-white shadow rounded-lg p-6 mb-4 relative">
                <div className="flex items-center space-x-4">
                    <User className="w-12 h-12 text-gray-600" />
                    <div>
                        {!isEditing ? (
                            <>
                                <h2 className="text-xl font-semibold">{profile.name}</h2>
                                <p className="text-gray-500">{profile.email}</p>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="absolute top-4 right-4 text-blue-600 hover:text-blue-800"
                                >
                                    <Edit className="w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit((data) => handleSaveProfile(data) )} className="space-y-4">
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">İsim</Label>
                                    <Input
                                        {...register("name")}
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">Soyad</Label>
                                    <Input
                                        {...register("lastName")}
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                                    )}
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">Email</Label>
                                    <Input
                                        {...register("email")}
                                        type="email"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700">Telefon Numarası</Label>
                                    <Input
                                        {...register("phoneNumber")}
                                        type="tel"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                                    )}
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        type={"submit"}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Save className="w-5 h-5 mr-2" /> Kaydet
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        İptal Et
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            {!isEditing && <PasswordChange />}
        </>
    );
}
