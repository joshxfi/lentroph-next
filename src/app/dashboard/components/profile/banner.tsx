import { FragmentOf, graphql, readFragment } from "gql.tada";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const BannerFields = graphql(`
  fragment BannerFields on User {
    name
    image
    username
  }
`);

export function ProfileBanner({ user }: { user: FragmentOf<typeof BannerFields> }) {
  const data = readFragment(BannerFields, user);

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
