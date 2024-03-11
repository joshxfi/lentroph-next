import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { graphql } from "gql.tada";
import { useMutation } from "urql";
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
import { OrgDialogFields } from "./org-dialog";

const FormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be more than 2 characters" })
    .max(30, { message: "Name must not exceed 50 characters." })
    .refine((name) => /^[a-zA-Z\s]+$/.test(name), {
      message: "Name can only contain letters and spaces",
    }),
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

const AddOrgMutation = graphql(
  `
    mutation AddOrg($input: AddOrgInput!) {
      addOrg(input: $input) {
        __typename
        id
        ...OrgDialogFields
      }
    }
  `,
  [OrgDialogFields],
);

export function OrgForm() {
  const [{ fetching }, addOrgFn] = useMutation(AddOrgMutation);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addOrgFn({
      input: data,
    }).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      form.reset();
      toast.success("Your organization has been sent for review.");
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-md pt-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Organization Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                You can still change this later.
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
              <FormLabel>
                Bio<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your organization bio"
                  {...field}
                />
              </FormControl>
              <FormDescription>Introduce your organization.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={fetching} type="submit">
          Submit for Approval
        </Button>
      </form>
    </Form>
  );
}
