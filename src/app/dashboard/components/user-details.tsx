import { FragmentOf, graphql, readFragment } from "gql.tada";

import { EditIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { PaymentMethod } from "./payment-method";
import { OrgSheet } from "./org-sheet";

type Props = {
  user: FragmentOf<typeof UserFields>;
  children: React.ReactNode;
};

export const UserFields = graphql(`
  fragment UserFields on User {
    name
    bio
    image
    username
  }
`);

export function UserDetails({ user, children }: Props) {
  const data = readFragment(UserFields, user);

  return (
    <section className="mb-12 space-y-4">
      <div className="flex space-x-6 items-center bg-white p-6 rounded-md shadow-sm">
        <Avatar className="h-24 w-24">
          <AvatarImage
            className="object-cover h-full w-full"
            src={data?.image ?? ""}
          />
          <AvatarFallback>
            {data?.username?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="text-xl font-semibold">{data.name}</p>
          <p>@{data.username}</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <aside className="w-2/3 space-y-4">
          <div className="p-6 bg-white shadow-sm rounded-md items-center">
            <div className="flex justify-between mb-2">
              <h3 className="text-base font-semibold">About</h3>
              <Button variant="secondary" size="icon">
                <EditIcon className="h-5 w-5" />
              </Button>
            </div>

            {!data.bio ? (
              <p className="text-zinc-500">Click the edit icon to update bio</p>
            ) : (
              <p>{data.bio}</p>
            )}
          </div>

          <div className="p-6 bg-white shadow-sm rounded-md items-center">
            <div className="flex justify-between mb-2">
              <h3 className="text-base font-semibold">Your Organizations</h3>
              <OrgSheet />
            </div>

            {!data.bio ? (
              <p className="text-zinc-500">
                Click the add icon to create an organization
              </p>
            ) : (
              <p>{data.bio}</p>
            )}
          </div>

          <PaymentMethod />
        </aside>

        {children}
      </div>
    </section>
  );
}
