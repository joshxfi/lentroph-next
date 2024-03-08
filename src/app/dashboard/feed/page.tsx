"use client";

import { Suspense } from "react";
import { useQuery } from "@urql/next";
import { graphql } from "gql.tada";
import { Post, PostFields } from "@/components/dashboard/post";
import { PostForm } from "@/components/dashboard/post-form";

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
    <section className="max-w-screen-md mx-auto">
      <PostForm />
      {result.data?.posts.map((post) => <Post key={post.id} post={post} />)}
    </section>
  );
}
