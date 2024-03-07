"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@nextui-org/react";

export function RedirectButton({
  route,
  className,
  children,
  ...rest
}: {
  route: string;
  className?: string;
  children: React.ReactNode;
} & ButtonProps) {
  const router = useRouter();

  return (
    <Button
      color="secondary"
      radius="sm"
      className={className}
      type="button"
      {...rest}
      onClick={() => router.push(route)}
    >
      {children}
    </Button>
  );
}
