"use client";

import { Suspense } from "react";
import { gql, useQuery } from "@urql/next";

export default function Page() {
  return (
    <Suspense>
      <Profile />
    </Suspense>
  );
}

const GetUsersQuery = gql`
  query {
    users {
      id
      image
      email
    }
  }
`;

function Profile() {
  const [result] = useQuery({ query: GetUsersQuery });

  return (
    <section>
      <h1>Profile Page</h1>
      {result.data.users.map((user: any) => (
        <p key={user.id}>{JSON.stringify(user, null, 2)}</p>
      ))}
    </section>
  );
}
