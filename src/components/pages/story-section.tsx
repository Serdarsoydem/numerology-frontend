import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Stories() {
    return (
        <div className="flex items-center w-4/5 gap-4 overflow-x-auto px-6 hide-scrollbar">
            <div className="flex flex-col items-center gap-2 ">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4
                      hover:bg-pink-800 ">
                        <AvatarImage src="/images/ben.jpg"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">shadcn</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">jaredpalmer</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">maxleiter</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">shuding_</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">vercel</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">jaredpalmer</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">maxleiter</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">shuding_</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">vercel</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">shadcn</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">jaredpalmer</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">maxleiter</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">shuding_</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">vercel</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">jaredpalmer</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">maxleiter</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">shuding_</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">vercel</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">shadcn</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">jaredpalmer</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">maxleiter</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">shuding_</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">vercel</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">jaredpalmer</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">maxleiter</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">shuding_</div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[#fd79a8]">
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div
                        className="absolute -bottom-1 -right-1 bg-[#fd79a8] rounded-full w-5 h-5 flex items-center justify-center">
                        <PlusIcon className="w-3 h-3 text-white"/>
                    </div>
                </div>
                <div className="text-sm font-medium">vercel</div>
            </div>
        </div>
    )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M5 12h14"/>
            <path d="M12 5v14"/>
        </svg>
    )
}
