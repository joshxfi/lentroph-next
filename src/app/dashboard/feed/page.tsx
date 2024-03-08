"use client";

import { Suspense } from "react";
import { useQuery } from "@urql/next";
import { graphql } from "gql.tada";
import { PostForm } from "./components/post-form";
import { Post, PostFields } from "./components/post";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <Suspense>
      <Feed />
    </Suspense>
  );
}

const GetPostsQuery = graphql(
  `
    query GetPosts {
      posts {
        id
        ...PostFields
      }
    }
  `,
  [PostFields],
);

function Feed() {
  const [result] = useQuery({ query: GetPostsQuery });

  return (
    <section className="max-w-screen-sm mx-auto pb-24">
      <PostForm />
      <Separator className="my-8 bg-zinc-500" />

      <div className="space-y-4">
        {result.data?.posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </section>
  );
}
