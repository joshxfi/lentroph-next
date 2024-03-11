"use client";

import { Suspense } from "react";
import { graphql } from "gql.tada";
import { useQuery } from "@urql/next";
import { Post, PostFields } from "../../feed/components/post";
import { OrgBanner, OrgBannerFields } from "./components/org-banner";
import { OrgSidebar, OrgSidebarFields } from "./components/org-sidebar";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <Suspense>
      <Profile username={params.username} />
    </Suspense>
  );
}

const GetOrgQuery = graphql(
  `
    query GetOrg($username: String!) {
      getOrg(username: $username) {
        __typename
        ...OrgBannerFields
        ...OrgSidebarFields
        id
        posts {
          id
          ...PostFields
        }
      }
    }
  `,
  [OrgSidebarFields, OrgBannerFields, PostFields],
);

function Profile({ username }: { username: string }) {
  const [result] = useQuery({
    query: GetOrgQuery,
    variables: {
      username,
    },
    pause: !username,
  });

  return (
    <section className="max-w-screen-lg mx-auto">
      {result.data?.getOrg && (
        <>
          <OrgBanner org={result.data?.getOrg} />

          <div className="flex space-x-4">
            <OrgSidebar org={result.data?.getOrg} />
            <div className="space-y-4 w-full">
              {result.data?.getOrg.posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
