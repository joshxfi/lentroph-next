import { FragmentOf, graphql, readFragment } from "gql.tada";

import { EditIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

import { OrgSheet } from "../org-sheet";
import { PaymentMethod } from "../payment-method";
import { Separator } from "@/components/ui/separator";
import { OrgDialog, OrgDialogFields } from "../org-dialog";
import { useQuery } from "@urql/next";

export const SidebarFields = graphql(`
  fragment SidebarFields on User {
    bio
  }
`);

const GetOrgsQuery = graphql(
  `
    query GetUserOrgs {
      getUserOrgs {
        __typename
        id
        ...OrgDialogFields
      }
    }
  `,
  [OrgDialogFields],
);

export function ProfileSidebar({
  user,
}: {
  user: FragmentOf<typeof SidebarFields>;
}) {
  const [result] = useQuery({ query: GetOrgsQuery });
  const data = readFragment(SidebarFields, user);

  return (
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

        <Separator className="mb-4" />

        {!result.data?.getUserOrgs.length ? (
          <p className="text-zinc-500">
            Click the add icon to create an organization
          </p>
        ) : (
          <div className="space-y-2">
            {result.data.getUserOrgs.map((org) => (
              <OrgDialog key={org.id} org={org} />
            ))}
          </div>
        )}
      </div>

      <PaymentMethod />
    </aside>
  );
}