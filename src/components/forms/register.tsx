"use client"
import React, { useState } from 'react';
import { LoginForm } from  "./login-form";
import { SignupForm } from './signup-form';
import { ForgotPasswordForm } from './forgot-password-form';
import { ResetPasswordForm } from './reset-password-form';
import Image from "next/image";

const Register = ({
                      operation,
                      token,
                  }: {
    operation: 'login' | 'signup' | 'reset-password' | 'forgot-password',
    token?: string,
}) => {
    const [operationInProgress, setOperationInProgress] = useState(operation);

    const getFormComponent = () => {
        switch (operationInProgress) {
            case 'login':
                return <LoginForm setOperationInProgress={setOperationInProgress} />;
            case 'signup':
                return <SignupForm setOperationInProgress={setOperationInProgress} />;
            case 'forgot-password':
                return <ForgotPasswordForm  setOperationInProgress={setOperationInProgress}/>;
            case 'reset-password':
                if (!token) return null
                return <ResetPasswordForm token={token} setOperationInProgress={setOperationInProgress} />;
            default:
                return null;
        }
    };

    return (
        <div className="font-[sans-serif] max-w-7xl mx-auto h-screen">
            <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                <div className="max-w-lg max-md:mx-auto w-full p-6">
                    {getFormComponent()}
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
