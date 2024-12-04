"use client";

import { useUser } from "@clerk/nextjs"; // Import useUser from Clerk
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./Searchbar";

const MobileMenu = () => {
  const { user } = useUser(); // Get the current user from Clerk

  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  return (
    <div className="md:hidden">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "rotate-45" : ""} origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "opacity-0" : ""} ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "-rotate-45" : ""} origin-left ease-in-out duration-500`}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
          <SearchBar />
          <Link href="/" onClick={handleLinkClick}>
            Home
          </Link>
          <Link href="/followers" onClick={handleLinkClick}>
            Following
          </Link>
          {user && (
            <Link href={`/profile/${user.username}`} onClick={handleLinkClick}>
              Profile
            </Link>
          )}
          <Link href="/stories" onClick={handleLinkClick}>
            Stories
          </Link>
          <Link href="/login" onClick={handleLinkClick}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;