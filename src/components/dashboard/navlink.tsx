import Link from "next/link";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export function NavLink({ name }: { name: string }) {
  const pathname = usePathname();
  const route =
    name === "Profile" ? "/dashboard" : `/dashboard/${name.toLowerCase}`;

  return (
    <Link href={route}>
      <Button
        variant={pathname === route ? "solid" : "light"}
        color="secondary"
        className="font-medium"
      >
        {name}
      </Button>
    </Link>
  );
}
