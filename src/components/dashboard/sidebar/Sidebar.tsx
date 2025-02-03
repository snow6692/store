import { currentDbUser } from "@/actions/userAction";
import Logo from "@/components/shared/Logo";
import UserInfo from "./UserInfo";
import SidebarNavMenu from "./NavAdmin";
import {
  adminDashboardSidebarOptions,
  SellerDashboardSidebarOptions,
} from "@/constants/data";
import { Store } from "@prisma/client";
import SidebarNavSeller from "./NavSeller";

interface IProps {
  isAdmin?: boolean;
  stores?: Store[];
}
async function Sidebar({ isAdmin, stores }: IProps) {
  const user = await currentDbUser();

  return (
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-[300] flex-col border-r p-4">
      <Logo width="80px" height="80px" />
      <span className="mt-3" />
      <UserInfo user={user} />
      {isAdmin ? (
        <SidebarNavMenu menuLinks={adminDashboardSidebarOptions} />
      ) : (
        <SidebarNavSeller menuLinks={SellerDashboardSidebarOptions} />
      )}
    </div>
  );
}

export default Sidebar;
