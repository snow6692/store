import { currentDbUser } from "@/actions/userAction";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const user = await currentDbUser();

  if (user?.role === "ADMIN") redirect("/dashboard/admin");
  if (user?.role === "SELLER") redirect("/dashboard/seller");
  if (user?.role === "USER") redirect("/");
  return <div>page</div>;
}

export default page;
