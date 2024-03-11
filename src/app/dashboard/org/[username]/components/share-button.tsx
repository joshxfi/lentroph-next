import { CopyIcon } from "@radix-ui/react-icons";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShareIcon } from "@/components/icons";
import { toast } from "sonner";

export function ShareButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <ShareIcon className="mr-2 h-5 w-5" /> Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Tell your friends and family about this organization!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={
                typeof window !== "undefined" ? window?.location.href : ""
              }
              readOnly
            />
          </div>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                typeof window !== "undefined" ? window?.location.href : "",
              );
              toast.success("Copied to clipboard!");
            }}
            type="submit"
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
