"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { graphql } from "gql.tada";
import { useMutation } from "urql";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be more than 2 characters" })
    .max(30, { message: "Username must not be longer than 30 characters." })
    .refine((username) => /^[a-zA-Z0-9_]+$/.test(username), {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  bio: z
    .string()
    .min(25, { message: "Bio must contain at least 25 characters" })
    .max(150, { message: "Bio must not exceed 150 characters." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UpdateUsernameMutation = graphql(`
  mutation UpdateUsername($username: String!) {
    updateUsername(username: $username) {
      username
    }
  }
`);

const UpdateBioMutation = graphql(`
  mutation UpdateBio($bio: String!) {
    updateBio(bio: $bio)
  }
`);

export function ProfileForm() {
  const { data: session } = useSession();

  const [usernameRes, updateUsernameFn] = useMutation(UpdateUsernameMutation);
  const [bioRes, updateBioFn] = useMutation(UpdateBioMutation);

  const defaultValues: Partial<ProfileFormValues> = {
    username: session?.user.username,
    bio: session?.user.bio,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    let error = false;

    if (data.username) {
      updateUsernameFn({ username: data.username }).then((res) => {
        if (res.error) {
          error = true;
          toast.error(res.error.message);
          return;
        }

        form.setValue(
          "username",
          usernameRes.data?.updateUsername.username ?? "",
        );
      });
    }

    if (data.username) {
      updateBioFn({ bio: data.bio }).then((res) => {
        if (res.error) {
          error = true;
          toast.error(res.error.message);
          return;
        }

        form.setValue("bio", bioRes.data?.updateBio ?? "");
      });
    }

    if (!error) {
      toast.success("Update successful");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={usernameRes.fetching || bioRes.fetching}
          type="submit"
        >
          Update profile
        </Button>
      </form>
    </Form>
  );
}
