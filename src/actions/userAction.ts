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
