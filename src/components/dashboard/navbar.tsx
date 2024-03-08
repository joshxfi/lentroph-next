"use client";

import { Logo } from "../logo";
import { NavLink } from "./navlink";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            <NavLink name="Analytics" />
          </div>
        </section>

        <Avatar>
          <AvatarImage src={data?.user.image ?? ""} />
          <AvatarFallback>
            {data?.user.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
