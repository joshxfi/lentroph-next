import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { graphql } from "gql.tada";
import { useMutation } from "urql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { OrgFields } from "./org-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";

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
        ...OrgFields
      }
    }
  `,
  [OrgFields],
);

export function OrgForm() {
  const [{ fetching }, addOrgFn] = useMutation(AddOrgMutation);
  const [imgUrl, setImgUrl] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!imgUrl) {
      toast.error("You must add the organization logo.");
      return;
    }

    addOrgFn({
      input: {
        ...data,
        image: imgUrl,
      },
    }).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      form.reset();
      setImgUrl("");
      toast.success("Your organization has been sent for review.");
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-md pt-6"
      >
        <div>
          <FormItem>
            <FormLabel>
              Organization Logo<span className="text-red-500">*</span>
            </FormLabel>
          </FormItem>

          {imgUrl && (
            <Image
              width={100}
              height={100}
              src={imgUrl}
              onDoubleClick={() => setImgUrl("")}
              className="object-cover h-24 w-24 rounded-md my-2 flex-none"
              alt="Organization Logo"
            />
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-2" variant="secondary">
                <ImageIcon className="mr-2 h-4 w-4" /> Upload Logo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Upload photo</DialogTitle>
                <DialogDescription>
                  Click the button below to add your organization logo.
                </DialogDescription>
              </DialogHeader>
              <Separator className="my-4" />
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImgUrl(res[0].url);
                }}
                onUploadError={(error: Error) => {
                  toast(error.message);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

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
