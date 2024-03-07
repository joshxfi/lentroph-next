"use client";

import { useSession } from "next-auth/react";
import { Logo } from "../logo";
import { NavLink } from "./navlink";
import { Avatar } from "@nextui-org/react";

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

        <Avatar src={data?.user.image ?? ""} />
      </div>
    </nav>
  );
}
