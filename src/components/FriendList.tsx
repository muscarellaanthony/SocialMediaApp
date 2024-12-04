"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Follower = {
  id: string;
  username: string;
  avatar: string;
};

type FollowerData = {
  follower: Follower;
};

const FriendList = () => {
  const [followers, setFollowers] = useState<FollowerData[]>([]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await fetch("/api/followers"); // Assuming your API is at /api/followers
        const data = await response.json();
        setFollowers(data); // Ensure the response matches the expected structure
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    getFollowers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">People you Follow</h1>
      <div className="space-y-4">
        {followers.map((followerData) => {
          const { id, username, avatar } = followerData.follower; // Access the follower properties here
          return (
            <div key={id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <Image
                src={avatar || "/noAvatar.png"}
                alt={username}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <Link href={`/profile/${username}`}>
                  <h2 className="text-lg font-semibold text-blue-600 hover:underline">{username}</h2>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendList;