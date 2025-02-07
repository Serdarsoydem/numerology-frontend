import React, { useState } from 'react';
import { Camera, Edit, Check } from 'lucide-react';

// Sample avatar images (replace with your actual avatar collection)
const avatars = ["image1","image2","image3","image4","image5", "image6"];

interface Props {
    currentAvatar: string;
    onAvatarChange: (avatar: string) => void;
    size?: number;
}

const AvatarSelector: React.FC<Props> = ({
                                             currentAvatar,
                                             onAvatarChange,
                                             size = 120
                                         }) => {
    const [isSelectionOpen, setIsSelectionOpen] = useState(false);

    const handleAvatarSelect = (avatar: string) => {
        onAvatarChange(avatar);
        setIsSelectionOpen(false);
    };

    return (
        <div className="relative">
            {/* Avatar with Edit Button */}
            <div
                className="relative group"
                style={{
                    width: `${size}px`,
                    height: `${size}px`
                }}
            >
                {/* Avatar Image */}
                <img
                    src={currentAvatar || '/api/placeholder/200/200?text=Default'}
                    alt="User Avatar"
                    className="rounded-full object-cover w-full h-full"
                />

                {/* Edit Button Overlay */}
                <button
                    onClick={() => setIsSelectionOpen(!isSelectionOpen)}
                    className="absolute top-0 right-0 bg-blue-500 text-white rounded-full p-1 m-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Edit size={16} />
                </button>
            </div>

            {/* Avatar Selection Modal */}
            {isSelectionOpen && (
                <div className="absolute z-10 top-full mt-2 bg-white border rounded-lg shadow-lg p-4 min-w-[250px]">
                    <div className="grid grid-cols-3 gap-2">
                        {avatars.map((avatar, index) => (
                            <button
                                key={index}
                                onClick={() => handleAvatarSelect(avatar)}
                                className={`
                                    hover:border-blue-500 
                                    border-2 
                                    rounded-full 
                                    transition 
                                    relative
                                    ${currentAvatar === avatar
                                    ? 'border-blue-500 ring-2 ring-blue-300'
                                    : 'border-transparent'}
                                `}
                            >
                                <img
                                    src={`/avatar/${avatar}`}
                                    alt={`Avatar ${index + 1}`}
                                    className="rounded-full w-20 h-20 object-cover"
                                />
                                {currentAvatar === avatar && (
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full p-1 m-1">
                                        <Check size={12} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setIsSelectionOpen(false)}
                        className="mt-2 w-full bg-gray-200 text-black rounded-md py-1"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default AvatarSelector;
