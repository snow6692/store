import { ModeToggle } from "@/components/shared/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className=" p-5">
      <div className=" flex justify-end gap-5">
        <SignedIn>
          <UserButton
            fallback=<div className="bg-black size-8 animate-pulse  rounded-full " />
          />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="default">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <ModeToggle />
      </div>
    </div>
  );
}
