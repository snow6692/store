import { currentDbUser } from "@/actions/userAction";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
async function page() {
  const user = await currentDbUser();
  if (!user) redirect("/");
  if (user?.role !== "SELLER") redirect("/");
  const stores = await prisma.store.findMany({
    where: { userId: user.id },
  });

  if (stores.length === 0) {
    redirect("/dashboard/seller/stores/new");
  }

  redirect(`/dashboard/seller/stores/${stores[0].url}`);
  return <div>page</div>;
}

export default page;
