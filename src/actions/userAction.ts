"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function currentDbUser() {
  const clerkUser = await currentUser();
  return await prisma.user.findUnique({
    where: {
      clerkUserId: clerkUser?.id,
    },
  });
}
