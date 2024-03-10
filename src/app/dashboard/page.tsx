"use client";

import { Suspense } from "react";
import { graphql } from "gql.tada";
import { useQuery } from "@urql/next";
import { useSession } from "next-auth/react";
import { Post, PostFields } from "./feed/components/post";
import {
  Banner,
  BannerFields,
  ProfileBanner,
} from "./components/profile/banner";
import { ProfileSidebar, SidebarFields } from "./components/profile/sidebar";

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
        ...BannerFields
        ...SidebarFields
        posts {
          id
          ...PostFields
        }
      }
    }
  `,
  [BannerFields, PostFields, SidebarFields],
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
        <>
          <ProfileBanner user={result.data.getUser} />

          <div className="flex space-x-4">
            <ProfileSidebar user={result.data?.getUser} />
            <div className="space-y-4 w-full">
              {result.data?.getUser.posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
