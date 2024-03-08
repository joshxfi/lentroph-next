"use client";

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
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  content: z.string().max(1500, {
    message: "Content must not exceed 1500 characters.",
  }),
});

const AddPostMutation = graphql(`
  mutation AddPost($content: String!) {
    addPost(content: $content)
  }
`);

export function PostForm() {
  const [{ fetching }, addPost] = useMutation(AddPostMutation);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addPost({ content: data.content }).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      toast.success("Posted successfully.");
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-md p-6"
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
              <FormDescription>
                Creating an impact, one post at a time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={fetching} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
