"use client";

import * as React from "react";
import { toast } from "sonner";
import { useMutation } from "urql";
import { graphql } from "gql.tada";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, SpinnerIcon } from "@/components/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UpdateUsernameMutation = graphql(`
  mutation UpdateUsername($username: String!) {
    updateUsername(username: $username) {
      id
    }
  }
`);

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { data, status, update } = useSession();
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [{ fetching }, updateUsernameFn] = useMutation(UpdateUsernameMutation);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    updateUsernameFn({ username }).then((res) => {
      if (res.error) {
        toast.error(res.error.message.replace("[GraphQL] ", ""));
        return;
      }

      setUsername("");
      update({ user: { username } });
      toast.success("Welcome to Lentroph");
      router.push("/dashboard");
    });
  }

  if (status)
    return (
      <div className={cn("grid gap-6", className)} {...props}>
        {status === "authenticated" && !data.user.username && (
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="username">
                  Username
                </Label>
                <Input
                  id="username"
                  value={username}
                  minLength={3}
                  maxLength={15}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Write your username"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="username"
                  autoCorrect="off"
                  disabled={fetching}
                />
              </div>
              <Button disabled={fetching}>
                {fetching && <SpinnerIcon className="mr-2 h-4 w-4" />}
                Continue
              </Button>
            </div>
          </form>
        )}

        {status === "loading" && (
          <Button
            variant="secondary"
            onClick={() => signIn("google")}
            type="button"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <SpinnerIcon className="mr-2 h-4 w-4" />
            ) : (
              <GoogleIcon className="mr-2 h-4 w-4" />
            )}{" "}
            Sign in with Google
          </Button>
        )}

        {status === "unauthenticated" && (
          <Button
            variant="secondary"
            onClick={() => signIn("google")}
            type="button"
          >
            <GoogleIcon className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
        )}
      </div>
    );
}
