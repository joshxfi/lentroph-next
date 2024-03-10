import { AppleIcon, PaypalIcon } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function PaymentMethod() {
  return (
    <Card className="shadow-sm border-none rounded-md">
      <CardHeader>
        <CardTitle className="text-base">Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-purple-100 hover:text-purple-800 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-purple-100 hover:text-purple-800 cursor-pointer"
            >
              <PaypalIcon className="mb-3 h-6 w-6" />
              Paypal
            </Label>
          </div>
          <div>
            <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
            <Label
              htmlFor="apple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-purple-100 hover:text-purple-800 cursor-pointer"
            >
              <AppleIcon className="mb-3 h-6 w-6" />
              Apple
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
