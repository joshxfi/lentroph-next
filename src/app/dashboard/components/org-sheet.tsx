import { AddIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OrgForm } from "./org-form";

export function OrgSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon">
          <AddIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add organization</SheetTitle>
          <SheetDescription>
            Your organization will be reviewed. Approval can take up to 3
            business days.
          </SheetDescription>
        </SheetHeader>

        <OrgForm />
      </SheetContent>
    </Sheet>
  );
}
