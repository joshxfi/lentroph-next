"use client";

import { Suspense } from "react";
import { useQuery } from "@urql/next";
import { graphql } from "gql.tada";

export default function Page() {
  return (
    <Suspense>
      <Profile />
    </Suspense>
  );
}

const GetUsersQuery = graphql(`
  query GetUsers {
    users {
      id
      bio
      image
      username
    }
  }
`);

function Profile() {
  const [result] = useQuery({ query: GetUsersQuery });

  return (
    <section>
      {result.data?.users.map((user) => <p key={user.id}>{user.username}</p>)}
    </section>
  );
}
