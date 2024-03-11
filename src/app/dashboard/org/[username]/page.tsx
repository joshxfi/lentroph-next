"use client";

import { Suspense } from "react";
import { graphql } from "gql.tada";
import { useQuery } from "@urql/next";
import { Post, PostFields } from "../../feed/components/post";
import { OrgBanner, OrgBannerFields } from "./components/org-banner";
import { OrgSidebar, OrgSidebarFields } from "./components/org-sidebar";
import { EditOrgForm, OrgFields } from "./components/edit-org-form";
import { PostForm } from "../../feed/components/post-form";

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
        id
        ...OrgBannerFields
        ...OrgSidebarFields
        ...OrgFields
        posts {
          id
          ...PostFields
        }
      }
    }
  `,
  [OrgSidebarFields, OrgBannerFields, PostFields, OrgFields],
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
            <OrgSidebar org={result.data?.getOrg}>
              <EditOrgForm org={result.data.getOrg} />
            </OrgSidebar>

            <div className="w-full space-y-4">
              <PostForm />

              <div className="space-y-4 w-full">
                {result.data?.getOrg.posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
