import { FragmentOf, graphql, readFragment } from "gql.tada";

import { EditIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PaymentMethod } from "@/app/dashboard/components/payment-method";

export const OrgSidebarFields = graphql(`
  fragment OrgSidebarFields on Organization {
    bio
  }
`);

export function OrgSidebar({
  org,
}: {
  org: FragmentOf<typeof OrgSidebarFields>;
}) {
  const data = readFragment(OrgSidebarFields, org);

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
      <PaymentMethod />
    </aside>
  );
}
