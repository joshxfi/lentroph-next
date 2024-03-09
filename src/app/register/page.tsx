import { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { UserAuthForm } from "./components/user-auth-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="mx-auto flex w-full flex-col space-y-6 sm:w-[450px] bg-white p-12 shadow-sm rounded-lg">
      <div className="flex flex-col space-y-2 text-center">
        <Logo className="mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          Connect your Google account to get started.
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground pt-8">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
