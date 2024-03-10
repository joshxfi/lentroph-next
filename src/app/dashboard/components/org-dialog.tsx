import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FragmentOf, graphql, readFragment } from "gql.tada";

export const OrgDialogFields = graphql(`
  fragment OrgDialogFields on Organization {
    bio
    name
    username
    isApproved
  }
`);

export function OrgDialog({
  org,
}: {
  org: FragmentOf<typeof OrgDialogFields>;
}) {
  const data = readFragment(OrgDialogFields, org);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex justify-between items-center w-full py-6"
        >
          <p className="font-medium text-purple-600">@{data.username}</p>
          {data.isApproved ? (
            <Badge>{data.name}</Badge>
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

            <Badge variant="outline" className="bg-yellow-300">
              Pending
            </Badge>
          </DialogTitle>
          <DialogDescription>{data.bio}</DialogDescription>
        </DialogHeader>

        <p className="text-sm text-zinc-800">
          Your organization is currently under review. This could take up to 3
          business days. Thank you for your patience.
        </p>

        <Separator className="my-2" />

        <DialogFooter className="flex sm:justify-between items-center">
          <button
            type="button"
            className="text-red-500 hover:underline text-sm"
          >
            Cancel Request
          </button>

          <div className="flex space-x-2">
            <Button disabled={!data.isApproved}>Switch Account</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
