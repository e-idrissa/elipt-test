import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const LoadingPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center space-y-1">
            <div className="flex items-center justify-center rounded-xl p-4 mb-6 bg-primary text-white">
              <Spinner />
            </div>
            <p className="text-3xl font-bold text-center">Loading</p>
            <p className="text-xl font-medium text-muted-foreground text-center">
              Please wait while your content loads...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoadingPage;
