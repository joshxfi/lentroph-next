import { FragmentOf, graphql, readFragment } from "gql.tada";

import { DonateIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ShareButton } from "./share-button";

export const OrgBannerFields = graphql(`
  fragment OrgBannerFields on Organization {
    name
    image
    username
  }
`);

export function OrgBanner({
  org,
}: {
  org: FragmentOf<typeof OrgBannerFields>;
}) {
  const data = readFragment(OrgBannerFields, org);

  return (
    <section className="mb-8 bg-white p-6 rounded-md shadow-sm flex justify-between items-center">
      <div className="flex space-x-6 items-center">
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

      <div className="space-y-2 flex flex-col">
        <Button>
          <DonateIcon className="mr-2 h-5 w-5" /> Donate
        </Button>

        <ShareButton />
      </div>
    </section>
  );
}
