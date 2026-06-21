import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircleOffIcon } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center space-y-1">
            <div className="flex items-center justify-center rounded-xl p-4 mb-6 bg-primary text-white">
              <CircleOffIcon />
            </div>
            <p className="text-3xl font-bold text-center">404</p>
            <p className="text-xl font-medium text-muted-foreground text-center">
              Page Not Found
            </p>
          </CardContent>
          <CardFooter>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "default", className: "w-full" }),
              )}
            >
              Back Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NotFoundPage;
