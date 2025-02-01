import { currentDbUser } from "@/actions/userAction";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function SellerDashboardLayout({ children }: { children: ReactNode }) {
  const user = await currentDbUser();
  if (user?.role !== "SELLER") redirect("/");
  return <div>{children}</div>;
}

export default SellerDashboardLayout;
