import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

export function NavLink({ name }: { name: string }) {
  const pathname = usePathname();
  const route =
    name === "Profile" ? "/dashboard" : `/dashboard/${name.toLowerCase()}`;

  return (
    <Link
      href={route}
      className={buttonVariants({
        variant: pathname === route ? "secondary" : "ghost",
      })}
    >
      {name}
    </Link>
  );
}
