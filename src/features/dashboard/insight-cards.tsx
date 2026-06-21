import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { BanknoteIcon, InboxIcon, StoreIcon } from "lucide-react";

export const InsightCards = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-1">
            <BanknoteIcon className="text-emerald-700" />
            Total Investment
          </CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-medium">$ 3,000</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-1">
            <InboxIcon className="text-blue-700" />
            Your Products
          </CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-medium">45</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-1">
            <StoreIcon className="text-amber-700" />
            Others Products
          </CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-medium">500</CardContent>
      </Card>
    </div>
  );
};
