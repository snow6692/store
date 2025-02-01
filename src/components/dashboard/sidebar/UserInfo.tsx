import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import React from "react";

interface IProps {
  user: User | null;
}

function UserInfo({ user }: IProps) {
  return (
    <div>
      <div className="">
        <Button
          className="mb-4 mt-5 flex w-full items-center justify-between py-10"
          variant={"ghost"}
        >
          <div className="flex items-center gap-2 text-left">
            <Avatar className="size-16">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback className="bg-primary text-white">
                {user?.name}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-y-1">
              {user?.name}
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
              <span className="w-fit">
                <Badge variant={"secondary"} className="capitalize">
                  {user?.role.toLocaleLowerCase()} Dashboard
                </Badge>
              </span>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default UserInfo;
