"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { icons } from "@/constants/icons";
import { DashboardSidebarMenuInterface } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SidebarNavMenu({
  menuLinks,
}: {
  menuLinks: DashboardSidebarMenuInterface[];
}) {
  const pathname = usePathname();
  return (
    <nav className="relative grow">
      <Command className="overflow-visible rounded-lg bg-transparent">
        <CommandInput placeholder="Search..." />
        <CommandList className="overflow-visible py-2">
          <CommandEmpty>No Links found.</CommandEmpty>
          <CommandGroup className="relative overflow-visible pt-0">
            {menuLinks.map((link) => {
              let icon;
              const iconSearch = icons.find((icon) => icon.value === link.icon);
              if (iconSearch) icon = <iconSearch.path />;
              return (
                <CommandItem
                  key={link.label}
                  className={cn(
                    "mt-1 h-12 w-full cursor-pointer",
                    link.link === pathname
                      ? "bg-accent text-accent-foreground"
                      : "",
                  )}
                >
                  <Link
                    href={link.link}
                    className="flex w-full items-center gap-2 rounded-md transition-all hover:bg-transparent"
                  >
                    {icon}
                    <span>{link.label}</span>
                  </Link>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </nav>
  );
}

export default SidebarNavMenu;
