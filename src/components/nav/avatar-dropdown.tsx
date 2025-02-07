import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut } from 'lucide-react';

interface AvatarDropdownProps {
    onProfileClick?: () => void;
    onLogoutClick?: () => void;
    avatarImageSrc?: string;
}

export function AvatarDropdown({
                                   onProfileClick,
                                   onLogoutClick,
                                   avatarImageSrc = ''
                               }: AvatarDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleProfileClick = () => {
        onProfileClick?.();
        setIsOpen(false);
    };

    const handleLogoutClick = () => {
        onLogoutClick?.();
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                    <AvatarImage src={avatarImageSrc} alt={`avatar`}/>
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogoutClick}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AvatarDropdown;
