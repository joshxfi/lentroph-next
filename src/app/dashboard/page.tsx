"use client";

import { Suspense } from "react";
import { graphql } from "gql.tada";
import { useQuery } from "@urql/next";
import { useSession } from "next-auth/react";
import { Post, PostFields } from "./feed/components/post";
import { UserDetails, UserFields } from "./components/user-details";

export default function Page() {
  return (
    <Suspense>
      <Profile />
    </Suspense>
  );
}

const GetUserQuery = graphql(
  `
    query GetUser($userId: String!) {
      getUser(userId: $userId) {
        id
        ...UserFields
        posts {
          id
          ...PostFields
        }
      }
    }
  `,
  [UserFields, PostFields],
);

function Profile() {
  const { data: session } = useSession();

  const [result] = useQuery({
    query: GetUserQuery,
    variables: {
      userId: session?.user.id!,
    },
    pause: !session?.user.id,
  });

  return (
    <section className="max-w-screen-lg mx-auto">
      {result.data?.getUser && (
        <UserDetails user={result.data?.getUser}>
          <div className="space-y-4 w-full">
            {result.data?.getUser.posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </UserDetails>
      )}
    </section>
  );
}
