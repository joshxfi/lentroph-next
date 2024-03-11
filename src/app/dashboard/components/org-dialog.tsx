import Link from "next/link";
import { toast } from "sonner";
import { useMutation } from "urql";
import { FragmentOf, graphql, readFragment } from "gql.tada";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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

export const OrgFields = graphql(`
  fragment OrgFields on Organization {
    __typename
    id
    bio
    name
    username
    isApproved
  }
`);

export const RemoveOrgMutation = graphql(`
  mutation RemoveOrg($orgId: String!) {
    removeOrg(orgId: $orgId)
  }
`);

export function OrgDialog({ org }: { org: FragmentOf<typeof OrgFields> }) {
  const data = readFragment(OrgFields, org);
  const [{ fetching }, removeOrgFn] = useMutation(RemoveOrgMutation);

  const onCancel = () => {
    removeOrgFn({ orgId: data.id.toString() }).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      toast.success("Request Cancelled");
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex justify-between items-center w-full py-6"
        >
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

        <p className="text-sm text-zinc-800">
          Your organization is currently under review. This could take up to 3
          business days. Thank you for your patience.
        </p>

        <Separator className="my-2" />

        <DialogFooter className="flex sm:justify-between items-center">
          {!data.isApproved && (
            <button
              onClick={onCancel}
              disabled={fetching}
              type="button"
              className="text-red-500 hover:underline text-sm disabled:text-red-300"
            >
              Cancel Request
            </button>
          )}

          {!data.isApproved ? (
            <Button disabled={true}>Switch Account</Button>
          ) : (
            <Link
              href={`/dashboard/org/${data.username}`}
              className={buttonVariants({ variant: "default" })}
            >
              Switch Account
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
