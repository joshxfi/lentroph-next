"use client";

import { graphql } from "gql.tada";
import { OrgCard, OrgCardFields } from "./org-card";
import { useQuery } from "urql";

const GetOrgsQuery = graphql(
  `
    query GetOrgs {
      orgs {
        __typename
        id
        ...OrgCardFields
      }
    }
  `,
  [OrgCardFields],
);

export function Organizations() {
  const [result] = useQuery({ query: GetOrgsQuery });

  return (
    <section className="grid grid-cols-3 gap-4">
      {result.data?.orgs.map((org) => <OrgCard key={org.id} org={org} />)}
    </section>
  );
}
