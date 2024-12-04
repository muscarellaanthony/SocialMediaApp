"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User } from "@prisma/client";

interface SearchBarProps {
  closeMenu?: () => void; // Add this prop type
}

const SearchBar = ({ closeMenu }: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Controls visibility of results
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && !resultsRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close results if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSearchResults = async (searchQuery: string) => {
    const res = await fetch(`/api/search?query=${searchQuery}`);
    const data = await res.json();
    setResults(data);
    setIsOpen(true); // Show results after fetching
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    if (query.trim() !== "") {
      fetchSearchResults(query);
    } else {
      setResults([]);
      setIsOpen(false); // Hide results when query is cleared
    }
  };

  const handleSelectUser = (user: User) => {
    setQuery(user.username); // Set selected user as query
    setIsOpen(false); // Close the results dropdown
    router.push(`/profile/${user.username}`); // Navigate to user profile
    if(closeMenu) closeMenu(); // Close the mobile menu after selecting a user
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearchChange}
        ref={inputRef}
        className="bg-transparent outline-none p-2 border rounded-xl w-full"
      />
      <Image src="/search.png" alt="Search" width={14} height={14} className="absolute right-3 top-1/2 transform -translate-y-1/2" />

      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-xl max-h-60 overflow-y-auto z-50 w-full sm:w-80 md:w-96 lg:w-120 xl:w-140"
        >
          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectUser(user)} // Call handleSelectUser
            >
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt={user.username}
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <span>{user.username}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;