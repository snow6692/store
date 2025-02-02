"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function currentDbUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");
  return await prisma.user.findUnique({
    where: {
      clerkUserId: clerkUser?.id,
    },
  });
}

export async function isAdmin() {
  try {
    const user = await currentDbUser();
    if (!user) throw new Error("UnAuthenticated");
    if (user.role !== "ADMIN")
      throw new Error(
        "UnAuthorized Access : Admin privileges required for Entry",
      );
    return user;
  } catch (error) {
    console.log(error);
  }
}
