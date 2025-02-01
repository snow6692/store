import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";

function DarkAuth() {
  return (
    <div className="flex justify-end gap-5">
      <SignedIn>
        <UserButton
          fallback=<div className="size-8 animate-pulse rounded-full bg-black" />
        />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      </SignedOut>
      <ModeToggle />
    </div>
  );
}

export default DarkAuth;
