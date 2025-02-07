"use client"

import React, {FC} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {useDevice} from "@/contexts/DeviceContext";
import {AuthorResponseTypeAPI, AuthorType} from "@/types/api-types";
import {formatDate} from "@/utils";


interface ShareComponentProps {
    author? : AuthorResponseTypeAPI
    date? : string
}

const ShareComponent: FC<ShareComponentProps> = ({ author, date }) => {
    const { toast } = useToast();
    const { isMobile } = useDevice();

    const shareLink = (platform: string) => {
        const url = window.location.href;
        const title = document.title;
        const text = `${url}`;

        if (isMobile) {
            navigator.share({
                title: title,
                text: text,
                url: url,
            })
                .then(() => console.log('Sharing successful'))
                .catch((error) => console.log('Sharing failed', error));
        } else {
            let shareUrl = '';
            switch (platform) {
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(url).then(
                        () => toast({
                            title: 'Link Kopyalandı',
                            variant: 'default',
                        })
                    );
                    return;
                default:
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank');
            }
        }
    };


    return (
        <div className="flex items-center justify-between">
            {(author && date) && (
                <div className="flex items-center space-x-4">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={`${author.data.attributes.image.data.attributes.url}`} alt={`${author.data.attributes.name} avatar`}/>
                        <AvatarFallback>{author.data.attributes.name.slice(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{author.data.attributes.name}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(date)}</div>
                    </div>
                </div>
            )}
            <div className="flex items-center space-x-4">
                <Button className="" variant="ghost" size="icon" onClick={() => shareLink('copy')}>
                    <ShareIcon className="w-5 h-5"/>
                    <span className="sr-only">Linki Kopyala</span>
                </Button>
                <Button className="hidden md:flex" variant="ghost" size="icon" onClick={() => shareLink('twitter')}>
                    <TwitterIcon className="w-5 h-5"/>
                    <span className="sr-only">X</span>
                </Button>
                <Button className="hidden md:flex" variant="ghost" size="icon" onClick={() => shareLink('facebook')}>
                    <FacebookIcon className="w-5 h-5" />
                    <span className="sr-only">Facebook</span>
                </Button>
                <Button className="hidden md:flex" variant="ghost" size="icon" onClick={() => shareLink('whatsapp')}>
                    <WhatsappIcon className="w-5 h-5" />
                    <span className="sr-only">WhatsApp</span>
                </Button>
            </div>
        </div>
    );
};

export default ShareComponent;

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 50 50"
            fill="currentColor" // Allows for easy color customization
        >
            <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 29.079097 3.1186875 32.88588 4.984375 36.208984 L 2.0371094 46.730469 A 1.0001 1.0001 0 0 0 3.2402344 47.970703 L 14.210938 45.251953 C 17.434629 46.972929 21.092591 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 21.278025 46 17.792121 45.029635 14.761719 43.333984 A 1.0001 1.0001 0 0 0 14.033203 43.236328 L 4.4257812 45.617188 L 7.0019531 36.425781 A 1.0001 1.0001 0 0 0 6.9023438 35.646484 C 5.0606869 32.523592 4 28.890107 4 25 C 4 13.390466 13.390466 4 25 4 z M 16.642578 13 C 16.001539 13 15.086045 13.23849 14.333984 14.048828 C 13.882268 14.535548 12 16.369511 12 19.59375 C 12 22.955271 14.331391 25.855848 14.613281 26.228516 L 14.615234 26.228516 L 14.615234 26.230469 C 14.588494 26.195329 14.973031 26.752191 15.486328 27.419922 C 15.999626 28.087653 16.717405 28.96464 17.619141 29.914062 C 19.422612 31.812909 21.958282 34.007419 25.105469 35.349609 C 26.554789 35.966779 27.698179 36.339417 28.564453 36.611328 C 30.169845 37.115426 31.632073 37.038799 32.730469 36.876953 C 33.55263 36.755876 34.456878 36.361114 35.351562 35.794922 C 36.246248 35.22873 37.12309 34.524722 37.509766 33.455078 C 37.786772 32.688244 37.927591 31.979598 37.978516 31.396484 C 38.003976 31.104927 38.007211 30.847602 37.988281 30.609375 C 37.969311 30.371148 37.989581 30.188664 37.767578 29.824219 C 37.302009 29.059804 36.774753 29.039853 36.224609 28.767578 C 35.918939 28.616297 35.048661 28.191329 34.175781 27.775391 C 33.303883 27.35992 32.54892 26.991953 32.083984 26.826172 C 31.790239 26.720488 31.431556 26.568352 30.914062 26.626953 C 30.396569 26.685553 29.88546 27.058933 29.587891 27.5 C 29.305837 27.918069 28.170387 29.258349 27.824219 29.652344 C 27.819619 29.649544 27.849659 29.663383 27.712891 29.595703 C 27.284761 29.383815 26.761157 29.203652 25.986328 28.794922 C 25.2115 28.386192 24.242255 27.782635 23.181641 26.847656 L 23.181641 26.845703 C 21.603029 25.455949 20.497272 23.711106 20.148438 23.125 C 20.171937 23.09704 20.145643 23.130901 20.195312 23.082031 L 20.197266 23.080078 C 20.553781 22.728924 20.869739 22.309521 21.136719 22.001953 C 21.515257 21.565866 21.68231 21.181437 21.863281 20.822266 C 22.223954 20.10644 22.02313 19.318742 21.814453 18.904297 L 21.814453 18.902344 C 21.828863 18.931014 21.701572 18.650157 21.564453 18.326172 C 21.426943 18.001263 21.251663 17.580039 21.064453 17.130859 C 20.690033 16.232501 20.272027 15.224912 20.023438 14.634766 L 20.023438 14.632812 C 19.730591 13.937684 19.334395 13.436908 18.816406 13.195312 C 18.298417 12.953717 17.840778 13.022402 17.822266 13.021484 L 17.820312 13.021484 C 17.450668 13.004432 17.045038 13 16.642578 13 z M 16.642578 15 C 17.028118 15 17.408214 15.004701 17.726562 15.019531 C 18.054056 15.035851 18.033687 15.037192 17.970703 15.007812 C 17.906713 14.977972 17.993533 14.968282 18.179688 15.410156 C 18.423098 15.98801 18.84317 16.999249 19.21875 17.900391 C 19.40654 18.350961 19.582292 18.773816 19.722656 19.105469 C 19.863021 19.437122 19.939077 19.622295 20.027344 19.798828 L 20.027344 19.800781 L 20.029297 19.802734 C 20.115837 19.973483 20.108185 19.864164 20.078125 19.923828 C 19.867096 20.342656 19.838461 20.445493 19.625 20.691406 C 19.29998 21.065838 18.968453 21.483404 18.792969 21.65625 C 18.639439 21.80707 18.36242 22.042032 18.189453 22.501953 C 18.016221 22.962578 18.097073 23.59457 18.375 24.066406 C 18.745032 24.6946 19.964406 26.679307 21.859375 28.347656 C 23.05276 29.399678 24.164563 30.095933 25.052734 30.564453 C 25.940906 31.032973 26.664301 31.306607 26.826172 31.386719 C 27.210549 31.576953 27.630655 31.759893 28.164062 31.878906 C 28.696676 31.997623 29.372673 32.032904 30.082031 31.912109 C 30.437879 31.851032 31.154293 31.549022 31.810547 31.134766 C 32.466801 30.72051 33.021563 30.260372 33.121094 30.015625 C 33.094134 30.265388 33.045243 30.524826 32.869141 30.945312 C 32.663621 31.447078 32.168133 31.94916 31.306641 32.484375 C 30.445149 33.019589 29.425719 33.398284 28.240234 33.605469 C 27.054748 33.812654 25.688346 33.75685 24.001953 33.130859 C 20.854587 31.788447 18.199158 29.681156 16.292969 27.732422 C 15.481547 26.947382 14.8104 26.154447 14.435547 25.669922 C 13.645914 24.638354 12 22.572229 12 19.59375 C 12 16.987989 13.449804 15.464375 13.787109 15.111328 C 14.394119 14.481626 15.035618 14 16.074219 14 C 16.335119 14 16.547616 14.004894 16.669922 14.009766 C 16.707522 14.011327 16.628109 14 16.642578 15 z" />
        </svg>
    );
}


function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37a4 4 0 1 1-2.75-2.75 4 4 0 0 1 2.75 2.75z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );
}


function FacebookIcon(props : React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    )
}


function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    )
}


function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
    )
}


function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    )
}
