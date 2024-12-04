import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/lib/client";

const ProfileFeed = async ({ username }: { username?: string }) => {
  const { userId } = auth();

  let posts: any[] = [];

  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.length ? (
        posts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
            <Post post={post} />
          </div>
        ))
      ) : (
        <p>No posts found!</p>
      )}
    </div>
  );
};

export default ProfileFeed;