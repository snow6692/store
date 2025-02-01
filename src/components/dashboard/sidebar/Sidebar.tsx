import { currentDbUser } from "@/actions/userAction";
import Logo from "@/components/shared/Logo";
import UserInfo from "./UserInfo";
import SidebarNavMenu from "./NavAdmin";
import { adminDashboardSidebarOptions } from "@/constants/data";

interface IProps {
  isAdmin?: boolean;
}
async function Sidebar({ isAdmin }: IProps) {
  const user = await currentDbUser();

  return (
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-[300] flex-col border-r p-4">
      <Logo width="80px" height="80px" />
      <span className="mt-3" />
      <UserInfo user={user} />
      {isAdmin && <SidebarNavMenu menuLinks={adminDashboardSidebarOptions} />}
    </div>
  );
}

export default Sidebar;
