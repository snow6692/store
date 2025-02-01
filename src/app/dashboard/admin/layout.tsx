import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { currentDbUser } from "@/actions/userAction";
import Header from "@/components/dashboard/header/Header";
import { SignIn } from "@clerk/nextjs";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";

async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const user = await currentDbUser();
  if (!user) SignIn;

  if (user?.role !== "ADMIN") redirect("/");
  return (
    <main className="h-full w-full">
      <Sidebar isAdmin={true} />
      <div className="ml-[300px] w-full">
        {/* Header */}
        <Header />
        <div className="mt-[75px] w-full p-4">{children}</div>
      </div>
    </main>
  );
}

export default AdminDashboardLayout;
