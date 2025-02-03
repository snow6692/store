import { currentDbUser } from "@/actions/userAction";
import Header from "@/components/dashboard/header/Header";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function SellerStoreDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentDbUser();
  if (!user) {
    redirect("/");
  }
  const stores = await prisma.store.findMany({ where: { userId: user.id } });

  return (
    <div className="flex h-full w-full">
      <Sidebar stores={stores} />
      <div className="ml-[300px] w-full">
        <Header />
        <div className="mt-[75px] w-full p-4">{children}</div>
      </div>
      {children}
    </div>
  );
}

export default SellerStoreDashboardLayout;
