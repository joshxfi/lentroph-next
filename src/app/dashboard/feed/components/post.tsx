import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";

import { formatDistance } from "@/hooks/format-distance";
import { FragmentOf, graphql, readFragment } from "@/graphql";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { sdgs } from "@/lib/utils";

export const PostFields = graphql(`
  fragment PostFields on Post {
    sdg
    imgUrl
    content
    createdAt
    author {
      id
      name
      image
      username
    }
  }
`);

export function Post({ post }: { post: FragmentOf<typeof PostFields> }) {
  const data = readFragment(PostFields, post);

  if (!data.author) return <></>;

  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={data?.author.image ?? ""} />
            <AvatarFallback>
              {data?.author.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">
              {data.author.name}
            </p>
            <p className="text-sm text-zinc-600">@{data.author.username}</p>
          </div>
        </div>

        <span className="select-none text-zinc-500 text-xs">
          {formatDistanceToNowStrict(data.createdAt, {
            addSuffix: false,
            locale: {
              formatDistance: (...props) => formatDistance(...props),
            },
          })}
        </span>
      </div>

      <p className="mt-4">{data.content}</p>

      {data.imgUrl && (
        <Image
          width={500}
          height={300}
          src={data.imgUrl}
          className="w-full object-cover max-h-[300px] rounded-md mt-4"
          alt="Post Image"
        />
      )}

      {data.sdg && (
        <Badge className="mt-4 bg-blue-700 hover:bg-blue-700">
          {sdgs.find((sdg) => sdg.id === data.sdg)?.name}
        </Badge>
      )}
    </div>
  );
}
