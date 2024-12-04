import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client"; // Assuming your prisma client is in this path
import { NextResponse } from "next/server"; // Use NextResponse for the new app directory

// Define the GET handler (use GET method since you want to fetch followers)
export async function GET(req: Request) {
  const { userId } = auth(); 

  if (!userId) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  try {
    const followers = await prisma.follower.findMany({
      where: {
        followingId: userId, // Fetch followers of the current user
      },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}