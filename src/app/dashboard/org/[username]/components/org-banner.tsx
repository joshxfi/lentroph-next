import { FragmentOf, graphql, readFragment } from "gql.tada";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const OrgBannerFields = graphql(`
  fragment OrgBannerFields on Organization {
    name
    image
    username
  }
`);

export function OrgBanner({ org }: { org: FragmentOf<typeof OrgBannerFields> }) {
  const data = readFragment(OrgBannerFields, org);

  return (
    <section className="mb-8 flex space-x-6 items-center bg-white p-6 rounded-md shadow-sm">
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
    </section>
  );
}
