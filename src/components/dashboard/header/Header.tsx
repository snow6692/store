import { ModeToggle } from "@/components/shared/ModeToggle";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
  return (
    <div className="bg:background/80 fixed left-0 right-0 top-0 z-[20] flex items-center gap-4 border-b-[1px] p-4 backdrop-blur-md md:left-[300px]">
      <div className="ml-auto flex items-center gap-2">
        <UserButton afterSwitchSessionUrl="/" />
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;
