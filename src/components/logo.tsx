import Image from "next/image";
import { twMerge } from "tailwind-merge";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      width={200}
      height={50}
      className={twMerge("w-36 object-contain", className)}
      src="/images/lentroph.png"
      alt="Lentroph Logo"
    />
  );
}
