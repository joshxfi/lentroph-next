import { toast } from "sonner";
import { useMutation } from "urql";
import { FragmentOf, graphql, readFragment } from "gql.tada";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const OrgCardFields = graphql(`
  fragment OrgCardFields on Organization {
    __typename
    id
    name
    image
    isApproved
    username
    bio
    owner {
      id
      name
      email
      username
      image
    }
  }
`);

const ApproveOrgMutation = graphql(
  `
    mutation ApproveOrg($orgId: String!, $approve: Boolean!) {
      approveOrg(orgId: $orgId, approve: $approve) {
        ...OrgCardFields
      }
    }
  `,
  [OrgCardFields],
);

export function OrgCard({ org }: { org: FragmentOf<typeof OrgCardFields> }) {
  const data = readFragment(OrgCardFields, org);
  const [{ fetching: approving }, approveOrgFn] =
    useMutation(ApproveOrgMutation);

  const onApprove = () => {
    approveOrgFn({ orgId: data.id.toString(), approve: !data.isApproved }).then(
      (res) => {
        if (res.error) {
          toast.error(res.error.message);
          return;
        }

        if (!data.isApproved) {
          toast.success("Request Approved");
        } else {
          toast.success("Organization Disabled");
        }
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex items-start text-left flex-col py-16 shadow-sm h-0 border border-purple-300"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={data?.owner.image ?? ""} />
              <AvatarFallback>
                {data?.owner.username?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">
                {data.owner.name}
              </p>
              <p className="text-sm text-zinc-600">{data.owner.email}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between w-full items-center">
            <p className="font-medium text-purple-600">@{data.username}</p>
            {data.isApproved ? (
              <Badge variant="outline" className="bg-green-400">
                Approved
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-yellow-300">
                Pending
              </Badge>
            )}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex space-x-2 items-center">
            <p>{data.name}</p>

            {data.isApproved ? (
              <Badge variant="outline" className="bg-green-400">
                Approved
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-yellow-300">
                Pending
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>{data.bio}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-purple-700 text-sm">@{data.username}</p>
          {data.image && (
            <Image
              width={100}
              height={100}
              src={data.image}
              className="object-cover h-32 w-32 rounded-md flex-none"
              alt="Organization Logo"
            />
          )}
        </div>

        <Separator className="my-2" />

        <DialogFooter className="flex sm:justify-between items-center">
          <div className="flex space-x-2">
            <Button onClick={onApprove} disabled={approving}>
              {data.isApproved ? "Disable Organization" : "Approve Request"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
