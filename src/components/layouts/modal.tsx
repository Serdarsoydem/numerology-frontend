'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {MoveLeft} from "lucide-react";


export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            //dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        if (dialogRef.current) {
            dialogRef.current.close(); // Close the modal first
        }
        router.push("/");
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <dialog ref={dialogRef}
                    className="max-w-md max-h-md border-none rounded-lg bg-white relative flex justify-center items-center text-2xl "
                    onClose={onDismiss}>
                {children}
                <button
                    onClick={onDismiss}
                    className="absolute top-2.5 left-2.5 w-12 h-12 bg-black bg-opacity-5 border-none rounded-full flex items-center justify-center font-medium text-lg hover:bg-gray-200 "
                >
                    <MoveLeft size={64} color="white" className="text-2xl p-2 text-white"/>
                </button>
            </dialog>
        </div>
    );
}
