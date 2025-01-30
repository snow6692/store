import { ModeToggle } from "@/components/shared/ModeToggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className=" p-5">
      <div className=" flex justify-end gap-5">
        <UserButton
          fallback=<div className="bg-black size-8 animate-pulse  rounded-full " />
        />
        <ModeToggle />
      </div>
    </div>
  );
}
