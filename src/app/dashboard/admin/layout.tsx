import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { currentDbUser } from "@/actions/userAction";

async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const user = await currentDbUser();

  if (user?.role !== "ADMIN") redirect("/");
  return <div>{children}</div>;
}

export default AdminDashboardLayout;
