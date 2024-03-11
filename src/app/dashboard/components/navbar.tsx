"use client";

import { useSession } from "next-auth/react";

import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { NavLink } from "./navlink";
import { MenuDropdown } from "./menu-dropdown";

export function DashboardNavbar() {
  const { data } = useSession();

  return (
    <nav className="bg-white py-6 shadow-sm mb-12">
      <div className="container mx-auto flex items-center justify-between">
        <section className="flex space-x-20">
          <Logo />

          <div className="flex space-x-6">
            <NavLink name="Profile" />
            <NavLink name="Feed" />
            {process.env.NEXT_PUBLIC_ADMIN === data?.user.username && (
              <NavLink name="Analytics" />
            )}
          </div>
        </section>

        <MenuDropdown>
          <Avatar className="cursor-pointer">
            <AvatarImage src={data?.user.image ?? ""} />
            <AvatarFallback>
              {data?.user.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </MenuDropdown>
      </div>
    </nav>
  );
}
