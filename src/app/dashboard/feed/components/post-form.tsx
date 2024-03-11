"use client";

import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation } from "urql";
import { graphql } from "gql.tada";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import { Textarea } from "@/components/ui/textarea";
import { PostFields } from "./post";
import { UploadButton } from "@/lib/uploadthing";
import { ImageIcon } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { sdgs } from "@/lib/utils";

const FormSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "Caption must not be empty.",
    })
    .max(1500, {
      message: "Content must not exceed 1500 characters.",
    }),
});

const AddPostMutation = graphql(
  `
    mutation AddPost($content: String!, $imgUrl: String, $sdg: String) {
      addPost(content: $content, imgUrl: $imgUrl, sdg: $sdg) {
        id
        ...PostFields
      }
    }
  `,
  [PostFields],
);

export function PostForm() {
  const [{ fetching }, addPost] = useMutation(AddPostMutation);
  const [imgUrl, setImgUrl] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedSdg, setSelectedSdg] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addPost({ content: data.content, imgUrl, sdg: selectedSdg }).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      form.reset();
      setImgUrl("");
      setSelectedSdg("")
      toast.success("Posted successfully.");
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-md p-6 w-full"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Write a post</FormLabel>
              <FormControl>
                <Textarea placeholder="What's on your mind?" {...field} />
              </FormControl>
              {imgUrl && (
                <Image
                  width={500}
                  height={300}
                  onDoubleClick={() => setImgUrl("")}
                  src={imgUrl}
                  className="w-full object-cover max-h-[300px] rounded-md"
                  alt="Post Image"
                />
              )}
              <FormDescription>
                Creating an impact, one post at a time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button disabled={fetching} type="submit">
              Create Post
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="border border-purple-700"
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload photo</DialogTitle>
                  <DialogDescription>
                    Click the button below to add an image to your post.
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

          <div className="flex items-center space-x-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className="w-[150px] justify-start truncate"
                >
                  {selectedSdg ? (
                    sdgs.find((sdg) => sdg.id === selectedSdg)?.name
                  ) : (
                    <>Set SDG</>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="right" align="start">
                <Command>
                  <CommandInput placeholder="Change sdg..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem onSelect={() => setSelectedSdg("")}>
                        <span>None</span>
                      </CommandItem>
                      {sdgs.map((sdg) => (
                        <CommandItem
                          key={sdg.id}
                          id={sdg.id}
                          onSelect={() => {
                            setSelectedSdg(sdg.id);
                            setOpen(false);
                          }}
                        >
                          {sdg.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </form>
    </Form>
  );
}
