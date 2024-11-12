'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchBox() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const searchBoxRef = useRef<HTMLDivElement | null>(null); // To track the search box for click detection outside
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate fetching search results
        setSearchResults([
            `Result 1 for "${searchQuery}"`,
            `Result 2 for "${searchQuery}"`,
            `Result 3 for "${searchQuery}"`,
        ]);
    };

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleCollapse = useCallback(() => {
        setIsExpanded(false);
        setSearchQuery('');
        setSearchResults([]);
    }, [setIsExpanded]);

    // Close the search box if clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node) && isExpanded) {
                handleCollapse();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isExpanded, handleCollapse]);
    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="flex relative items-center"
                onClick={handleExpand}
            >
                <Search className="h-6 w-6" />
                <span className="sr-only">Expand search</span>
            </Button>
            {isExpanded && (
                <div className="fixed inset-0 bg-slate-300 bg-opacity-50 backdrop-blur-sm z-40" onClick={handleCollapse}></div>
            )}
            {isExpanded && (
                <div ref={searchBoxRef} className={`fixed top-0 left-0 right-0 p-6 z-50 ${isExpanded ? 'w-full' : 'max-w-md mx-auto'}`}>
                    <div className="relative flex items-center">
                        {(
                            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
                                <div className="relative flex-grow">
                                    <Input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full"
                                        autoFocus
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            size={20}/>
                                </div>
                                <Button type="submit">
                                    <Search className="h-6 w-6"/>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={handleCollapse}>
                                    <X className="h-6 w-6"/>
                                    <span className="sr-only">Close search</span>
                                </Button>
                            </form>
                        )}
                    </div>

                    {searchResults.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded p-4 z-50">
                            <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
                            <ul className="space-y-2">
                                {searchResults.map((result, index) => (
                                    <li key={index} className="p-2 bg-gray-100 rounded">{result}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
